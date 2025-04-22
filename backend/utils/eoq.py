import math
from companies.models import Product, PriceTier, Company
import pandas as pd

from companies.serializers import ProductPublicSerializer


class EOQComparer:

    @staticmethod
    def costo_totale_con_eoq(demand, ordering_cost, holding_cost, prezzo_unitario, eoq):
        costo_ordinazione_eoq = (demand / eoq) * ordering_cost
        costo_mantenimento_eoq = (eoq / 2) * holding_cost
        costo_unita_eoq = demand * prezzo_unitario
        return costo_ordinazione_eoq + costo_mantenimento_eoq + costo_unita_eoq

    @staticmethod
    def confronta(product: Product, annual_demand: int, holding_cost: float):
        annual_demand = float(annual_demand)
        holding_cost = float(holding_cost)
        ordering_cost = float(product.ordering_cost)

        Q_eoq = math.sqrt((2 * annual_demand * ordering_cost) / holding_cost)


        tiers = list(product.price_tiers.all())
        if not tiers: tiers = list(PriceTier(product=product, min_quantity=1, unit_price=product.price).save())

        miglior_costo = EOQComparer.costo_totale_con_eoq(annual_demand, ordering_cost, holding_cost, float(product.price), Q_eoq)
        calcolo_iniziale = {
                    "eoq": round(Q_eoq),
                    "req_unit_price": round(product.price, 2),
                    "min_quantity": annual_demand,
                    "total_cost": miglior_costo
                }
        migliore_opzione = None
        for tier in tiers:
            if (tier.min_quantity <= annual_demand): continue
            prezzo_unitario = float(tier.unit_price)
            costo = EOQComparer.costo_totale_con_eoq(tier.min_quantity, ordering_cost, holding_cost, prezzo_unitario, Q_eoq)
            print(f"Prezzo unitario: {prezzo_unitario}, EOQ: {Q_eoq}, Costo con EOQ: {costo}, min quantity: {tier.min_quantity}")

            if costo < miglior_costo:
                miglior_costo = costo
                migliore_opzione = {
                    **calcolo_iniziale,
                    "unit_price": round(tier.unit_price, 2),
                    "best_min_quantity": tier.min_quantity,
                    "best_total_cost": round(costo, 2)
                }

        return migliore_opzione if migliore_opzione else calcolo_iniziale

    @staticmethod
    def calcola_media_mobile_domanda_annuale(historical_sales):
        # Flatten the historical sales dictionary into a list of tuples (year, month, sales)
        sales_data = []
        years_count = len(historical_sales.items())
        for year, months in historical_sales.items():
            year_sales = 0
            for month, sales in months.items():
                year_sales += sales
            sales_data.append([f"{year}", year_sales]) # Creates data like [["2020", 100], ["2021", 200], ["2022", 300]]
        # Convert sales data to a pandas DataFrame
        df = pd.DataFrame(sales_data, columns=["Date", "Sales"])
        # Convert the 'Date' column to datetime to ensure proper handling
        df['Date'] = pd.to_datetime(df['Date'], format='%Y')
        # Sort the DataFrame by the 'Date' to make sure the data is ordered
        df = df.sort_values(by='Date')
        # Calculate the rolling mean for this year usign all past data
        df['media_mobile'] = df['Sales'].rolling(window=years_count).mean()
        # Predict using the last value of the rolling mean (this is the forecast for this year)
        prevision = df['media_mobile'].iloc[-1]  # The last rolling mean value
        print(f"This year prevision: {prevision}")
        return prevision

    # - Dare la possibilità sul FE di scegliere quale vedere
    # - IN OGNI CASO DEVE PER FORZA INSERIRE HOLDING_COST ALTIMENTI NON VEDE NIENTE !!!!!



    @staticmethod
    def calculateEOQ(company: Company, annual_demand: int, holding_cost: float):
        products = company.products.all()
        products_data = []
        predicted_eoq=False
        for product in products:
            product_data = ProductPublicSerializer(product).data
            # Calcola l'EOQ ottimale
            if annual_demand == 0:
                print("Calcolo della domanda annuale media mobile")
                annual_demand = EOQComparer.calcola_media_mobile_domanda_annuale(product.historical_sales)
                eoq_data = EOQComparer.confronta(product, annual_demand=annual_demand, holding_cost=holding_cost)
                product_data['eoq_pre'] = eoq_data
                predicted_eoq = True
            else:
                eoq_data = EOQComparer.confronta(product, annual_demand=annual_demand, holding_cost=holding_cost)
                product_data['eoq'] = eoq_data

            products_data.append(product_data)
        return products_data, predicted_eoq