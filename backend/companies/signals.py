from django.db.models.signals import post_migrate
from django.contrib.auth.models import User
from django.dispatch import receiver
from companies.models import Company, Product, PriceTier, Sector


@receiver(post_migrate)
def populate_initial_data(sender, **kwargs):
    if Company.objects.filter(name="Chip Inc").exists():
        print("Database already initialized with sample data.")
        return

    print("Initializing database with sample data...")

    tech, _ = Sector.objects.get_or_create(name="Technology")
    infra, _ = Sector.objects.get_or_create(name="Infrastructure")
    software, _ = Sector.objects.get_or_create(name="Software")

    if not User.objects.filter(username="chipinc").exists():
        chip_user = User.objects.create_user(username="chipinc", email="chip@inc.com", password="chip123")
    chip_company, _ = Company.objects.get_or_create(user=chip_user, name="Chip Inc", sector=tech)

    if not User.objects.filter(username="serverinc").exists():
        server_user = User.objects.create_user(username="serverinc", email="server@server.com", password="server123")
    server_company, _ = Company.objects.get_or_create(user=server_user, name="Server Inc", sector=infra)

    if not User.objects.filter(username="appsinc").exists():
        apps_user = User.objects.create_user(username="appsinc", email="apps@apps.com", password="apps123")
    apps_company, _ = Company.objects.get_or_create(user=apps_user, name="Apps Inc", sector=software)

    # CHIP INC
    products = [
        {'name': "NanoChip X1", 'description': "High performance nano chip", 'price': 200, 'tiers': [(1, 200), (500, 180), (1000, 160)],
               'historical_sales': {"2022": {"January":109,"February":101,"March":118,"April":122,"May":127,"June":115,"July":104,"August":96,"September":113,"October":138,"November":150,"December":175},"2023":{"January":171,"February":178,"March":182,"April":189,"May":195,"June":180,"July":173,"August":167,"September":184,"October":206,"November":230,"December":265},"2024":{"January":91,"February":87,"March":110,"April":130,"May":108,"June":115,"July":101,"August":90,"September":109,"October":130,"November":143,"December":162},"2025":{"January":315,"February":327,"March":333,"April":346}}},
        {'name': "NanoChip X2", 'description': "Advanced nano chip with AI capabilities", 'price': 250, 'tiers': [(1, 250), (500, 230), (1000, 210)],
               'historical_sales': {"2022": {"January":125,"February":136,"March":144,"April":145,"May":157,"June":143,"July":138,"August":132,"September":149,"October":151,"November":180,"December":215},"2023":{"January":211,"February":229,"March":232,"April":248,"May":253,"June":247,"July":234,"August":226,"September":245,"October":270,"November":303,"December":331},"2024":{"January":281,"February":293,"March":305,"April":319,"May":295,"June":287,"July":275,"August":260,"September":283,"October":307,"November":341,"December":370},"2025":{"January":389,"February":395,"March":401,"April":413}}},
        {'name': "NanoChip X3", 'description': "Ultra-fast nano chip for data centers", "price": 300, 'tiers': [(1, 300), (500, 280), (1000, 260)],
               'historical_sales': {"2022": {"January":149,"February":157,"March":161,"April":173,"May":175,"June":160,"July":155,"August":147,"September":164,"October":182,"November":218,"December":246},"2023":{"January":231,"February":244,"March":257,"April":260,"May":275,"June":269,"July":247,"August":239,"September":257,"October":285,"November":311,"December":350},"2024":{"January":312,"February":323,"March":331,"April":343,"May":335,"June":317,"July":296,"August":278,"September":300,"October":325,"November":358,"December":383},"2025":{"January":402,"February":418,"March":422,"April":436}}}
    ]

    for p in products:
        product = Product.objects.create(
            name=p['name'],
            description=p['description'],
            year_launched=2022,
            price=p['price'],
            historical_sales=p['historical_sales'],
            company=chip_company,
        )
        for min_qty, price in p['tiers']:
            PriceTier.objects.create(product=product, min_quantity=min_qty, unit_price=price)

    # SERVER INC
    products = [
        {'name': "Server Unit 1", 'description': "High performance server unit", 'price': 500, 'tiers': [(1, 500), (10, 450), (50, 400)],
               'historical_sales': {"2022": {"January":93,"February":91,"March":107,"April":116,"May":115,"June":104,"July":99,"August":98,"September":103,"October":122,"November":147,"December":165},"2023":{"January":161,"February":173,"March":185,"April":197,"May":202,"June":198,"July":186,"August":175,"September":190,"October":212,"November":249,"December":274},"2024":{"January":238,"February":246,"March":255,"April":263,"May":244,"June":232,"July":224,"August":211,"September":230,"October":265,"November":290,"December":325},"2025":{"January":337,"February":345,"March":359,"April":343}}},
        {'name': "Server Unit 2", 'description': "Advanced server unit with cloud capabilities", 'price': 600, 'tiers': [(1, 600), (10, 550), (50, 500)],
               'historical_sales': {"2022": {"January":140,"February":152,"March":165,"April":165,"May":171,"June":159,"July":150,"August":153,"September":160,"October":172,"November":198,"December":201},"2023":{"January":203,"February":212,"March":221,"April":236,"May":245,"June":234,"July":229,"August":218,"September":237,"October":255,"November":280,"December":311},"2024":{"January":135,"February":144,"March":153,"April":166,"May":157,"June":138,"July":130,"August":125,"September":121,"October":130,"November":162,"December":189},"2025":{"January":343,"February":358,"March":364,"April":377}}},
        {'name': "Server Unit 3", 'description': "Ultra-fast server unit for data centers", 'price': 700, 'tiers': [(1, 700), (10, 650), (50, 600)],
               'historical_sales': {"2022": {"January":155,"February":164,"March":173,"April":189,"May":198,"June":181,"July":173,"August":167,"September":184,"October":201,"November":235,"December":260},"2023":{"January":279,"February":281,"March":298,"April":302,"May":317,"June":303,"July":285,"August":277,"September":294,"October":328,"November":350,"December":382},"2024":{"January":355,"February":366,"March":374,"April":387,"May":373,"June":359,"July":335,"August":320,"September":341,"October":368,"November":386,"December":407},"2025":{"January":423,"February":431,"March":449,"April":455}}},
        {'name': "Server Unit 4", 'description': "Iper-fast server unit for data centers", 'price': 700,
         'tiers': [], 'historical_sales': {"2022":{"January":156,"February":166,"March":175,"April":194,"May":199,"June":183,"July":176,"August":171,"September":185,"October":203,"November":238,"December":264},"2023":{"January":280,"February":283,"March":301,"April":305,"May":321,"June":304,"July":287,"August":280,"September":298,"October":329,"November":352,"December":385},"2024":{"January":359,"February":361,"March":376,"April":390,"May":377,"June":360,"July":337,"August":323,"September":345,"October":369,"November":388,"December":410},"2025":{"January":427,"February":432,"March":451,"April":458}}}
    ]

    for p in products:
        product = Product.objects.create(
            name=p['name'],
            description=p['description'],
            year_launched=2022,
            price=p['price'],
            historical_sales=p['historical_sales'],
            company=server_company,
        )
        for min_qty, price in p['tiers']:
            PriceTier.objects.create(product=product, min_quantity=min_qty, unit_price=price)

    # APPS INC
    products = [
        {'name': "App Suite 1", 'description': "Comprehensive app suite for businesses", 'price': 100, 'tiers': [(1, 100), (10, 90), (50, 80)],
               'historical_sales': {"2022": {"January":71,"February":83,"March":95,"April":104,"May":118,"June":96,"July":81,"August":89,"September":95,"October":101,"November":123,"December":147},"2023":{"January":150,"February":165,"March":177,"April":183,"May":199,"June":177,"July":154,"August":147,"September":161,"October":185,"November":210,"December":244},"2024":{"January":139,"February":142,"March":138,"April":155,"May":144,"June":139,"July":123,"August":115,"September":130,"October":157,"November":188,"December":212},"2025":{"January":230,"February":245,"March":259,"April":263}}},
        {'name': "App Suite 2", 'description': "Advanced app suite with AI capabilities", 'price': 150, 'tiers': [(1, 150), (10, 140), (50, 130)],
               'historical_sales': {"2022": {"January":126,"February":131,"March":147,"April":145,"May":129,"June":140,"July":135,"August":138,"September":142,"October":155,"November":200,"December":244},"2023":{"January":111,"February":123,"March":137,"April":130,"May":152,"June":138,"July":130,"August":122,"September":120,"October":175,"November":195,"December":212},"2024":{"January":213,"February":224,"March":229,"April":243,"May":240,"June":217,"July":209,"August":204,"September":218,"October":240,"November":267,"December":302},"2025":{"January":324,"February":335,"March":345,"April":351}}},
        {'name': "App Suite 3", 'description': "Ultra-fast app suite for data centers", 'price': 200, 'tiers': [(1, 200), (10, 190), (50, 180)],
               'historical_sales': {"2022": {"January":134,"February":142,"March":156,"April":160,"May":175,"June":163,"July":155,"August":148,"September":164,"October":185,"November":213,"December":247},"2023":{"January":253,"February":261,"March":272,"April":285,"May":290,"June":289,"July":261,"August":258,"September":272,"October":300,"November":335,"December":367},"2024":{"January":263,"February":265,"March":270,"April":285,"May":298,"June":281,"July":263,"August":250,"September":269,"October":305,"November":333,"December":358},"2025":{"January":423,"February":436,"March":442,"April":455}}}
    ]

    for p in products:
        product = Product.objects.create(
            name=p['name'],
            description=p['description'],
            year_launched=2022,
            price=p['price'],
            historical_sales=p['historical_sales'],
            company=apps_company,
        )
        for min_qty, price in p['tiers']:
            PriceTier.objects.create(product=product, min_quantity=min_qty, unit_price=price)

    print("Data added successfully.")
