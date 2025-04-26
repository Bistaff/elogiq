import math
from companies.models import Product, PriceTier
import pandas as pd
from companies.serializers import ProductPublicSerializer

class EOQComparatore:

    @staticmethod
    def costo_totale_con_eoq(domanda_annuale, costo_di_setup, costo_mantenimento, prezzo_unitario, eoq):
        costo_ordinazione_eoq = (domanda_annuale / eoq) * costo_di_setup
        costo_mantenimento_eoq = (eoq / 2) * costo_mantenimento
        costo_unita_eoq = domanda_annuale * prezzo_unitario
        return costo_ordinazione_eoq + costo_mantenimento_eoq + costo_unita_eoq

    @staticmethod
    def confronta(product: Product, domanda_annuale: int, costo_mantenimento: float, costo_di_setup: float):
        domanda_annuale = float(domanda_annuale)
        costo_mantenimento = float(costo_mantenimento)
        costo_di_setup = float(costo_di_setup)
        Q_eoq = round(math.sqrt((2 * domanda_annuale * costo_di_setup) / costo_mantenimento))
        fasce_prezzo = list(product.price_tiers.all())
        if not fasce_prezzo: fasce_prezzo = list(PriceTier(product=product, min_quantity=1, unit_price=product.price))

        prezzo_unitario = float(product.price)
        for x in range(len(fasce_prezzo)):
            f_min = fasce_prezzo[x].min_quantity
            f_max = fasce_prezzo[x + 1].min_quantity - 1 if x < len(fasce_prezzo) - 1 else float("inf")
            if f_min <= domanda_annuale <= f_max:
                prezzo_unitario = float(fasce_prezzo[x].unit_price)
                break

        miglior_costo = EOQComparatore.costo_totale_con_eoq(domanda_annuale, costo_di_setup, costo_mantenimento, prezzo_unitario, Q_eoq)
        calcolo_iniziale = { "eoq":  1 if Q_eoq < 1 else round(Q_eoq), "req_unit_price": round(prezzo_unitario, 2),
                    "min_quantity": domanda_annuale, "total_cost": miglior_costo }

        migliore_opzione = None
        for fascia in fasce_prezzo:
            if (fascia.min_quantity <= domanda_annuale): continue
            prezzo_unitario = float(fascia.unit_price)
            costo = EOQComparatore.costo_totale_con_eoq(fascia.min_quantity, costo_di_setup, costo_mantenimento, prezzo_unitario, Q_eoq)

            if costo < miglior_costo:
                miglior_costo = costo
                migliore_opzione = { **calcolo_iniziale, "unit_price": round(fascia.unit_price, 2),
                    "best_min_quantity": fascia.min_quantity, "best_total_cost": round(costo, 2) }

        return migliore_opzione if migliore_opzione else calcolo_iniziale

    @staticmethod
    def calcola_media_mobile_domanda_annuale(vendite_storiche):
        # Formatta le vendite storiche in una lista di tuple
        dati_vendite = []
        conteggio_anni = len(vendite_storiche.items())
        for anno, mesi in vendite_storiche.items():
            vendite_anno = 0
            for mese, vendite in mesi.items():
                vendite_anno += vendite
            dati_vendite.append([f"{anno}", vendite_anno])
        # Converti i dati in un DataFrame pandas
        df = pd.DataFrame(dati_vendite, columns=["Date", "Sales"])
        # Converte la colonna 'Date' in datetime per garantire una corretta gestione
        df['Date'] = pd.to_datetime(df['Date'], format='%Y')
        # Ordina il DataFrame in base alla colonna 'Date' per garantire che i dati siano ordinati
        df = df.sort_values(by='Date')
        # Calcola la media mobile per il numero di anni passati
        df['media_mobile'] = df['Sales'].rolling(window=conteggio_anni).mean()
        # Prevede il valore della domanda annuale per l'anno corrente
        prevision = df['media_mobile'].iloc[-1] # Prende l'ultimo valore della media mobile
        return prevision


    @staticmethod
    def calcolaEOQ(product: Product, domanda_annuale: int, costo_mantenimento: float, costo_di_setup: float):
        product_data = ProductPublicSerializer(product).data
        if domanda_annuale == 0: # Se non è stata fornita una domanda annuale, calcola la media mobile
            domanda_annuale = EOQComparatore.calcola_media_mobile_domanda_annuale(product.historical_sales)
            eoq_data = EOQComparatore.confronta(product, domanda_annuale=domanda_annuale, costo_mantenimento=costo_mantenimento, costo_di_setup=costo_di_setup)
            product_data['eoq_pre'] = eoq_data
            product_data['predicted_eoq'] = True
        else: # Se è stata fornita una domanda annuale, calcola l'EOQ
            eoq_data = EOQComparatore.confronta(product, domanda_annuale=domanda_annuale, costo_mantenimento=costo_mantenimento, costo_di_setup=costo_di_setup)
            product_data['eoq'] = eoq_data
            product_data['predicted_eoq'] = False
        return product_data