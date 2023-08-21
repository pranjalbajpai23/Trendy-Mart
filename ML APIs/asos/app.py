from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import pandas as pd
import csv
import requests
import pandas as pd

app = Flask(__name__)
CORS(app)
@app.route('/', methods=['GET'])
def home():
    return '''Trending'''

cookies = {
    'geocountry': 'IN',
    'AMCVS_C0137F6A52DEAFCC0A490D4C%40AdobeOrg': '1',
    'floor': '1001',
    'featuresId': '9ce5bf3e-f9b2-4e94-a112-a0bdbc7a41db',
    'asos-perx': '60a2763bb2bc4a1c83ee51f99db749d3||dc1df1cc80b440708785af535f28987e',
    's_ecid': 'MCMID%7C50258212153682277691516959595292256438',
    's_cc': 'true',
    '_gcl_au': '1.1.660128502.1691785124',
    'bt_stdstatus': 'NOTSTUDENT',
    '_cs_c': '0',
    'bm_sz': '8CF28571508B97D5AC35467BBDF9DEC7~YAAQpY0sMcYG6fSJAQAAe6RjERQz+7NFCycBC1YUGj+iVzjJ2BiUxXeKIn0N57ovHo1GPSaJts6dPcpnt41chcqQCgifuLL2Pxul1YH8bZuTU1UNLUD4sLxoNKr/NanvhK9ArKHpmmPJUFBheJUPHq0FNIfGJEQ9t1X6VZ41RynBBhTjobDE3TVEMfGNlB6STW1xaE31dyLtnU434bRvsb1EDzyGnp9O/sLTodq3TYZHajCCCOeJxloiVchMkDJwpFKxoK5Ocyqu000senZp8pSGSXOElxMkgqhaNkgVqD9l~3225141~3687732',
    'siteChromeVersion': 'au=12&com=12&de=12&dk=12&es=12&fr=12&it=12&nl=12&pl=12&roe=12&row=12&ru=12&se=12&us=12',
    'keyStoreDataversion': 'd1w1kwo-37',
    'browseCountry': 'US',
    'browseCurrency': 'USD',
    'browseLanguage': 'en-US',
    'browseSizeSchema': 'US',
    'storeCode': 'US',
    'asos': 'PreferredSite=&currencyid=2&currencylabel=USD&topcatid=1001&customerguid=60a2763bb2bc4a1c83ee51f99db749d3',
    'currency': '2',
    'asos-b-sdv629': 'd1w1kwo-37',
    '_s_fpv': 'true',
    '_cs_mk_aa': '0.40190792854765434_1692508860491',
    'AMCV_C0137F6A52DEAFCC0A490D4C%40AdobeOrg': '-1303530583%7CMCMID%7C50258212153682277691516959595292256438%7CMCAAMLH-1693113660%7C12%7CMCAAMB-1693113660%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCCIDH%7C0%7CMCOPTOUT-1692516059s%7CNONE%7CvVersion%7C3.3.0%7CMCAID%7CNONE%7CMCSYNCSOP%7C411-19597',
    'FPLC': 'I9QlralyGQjkQzdtHTUokNNjUD2gTUS3MOJUw5Ko6twHPjoO43ZSRGcK5myYqf99kD5iVbF1FxeEk9kCKHzKV94sTZF3ayOqy1dYWyAk%2FLOXT8nNYVLsexIhoxYdJg%3D%3D',
    'FPID': 'FPID2.2.WQx9IPa1kbYED12p7SHxVBmX1tG0bnrpNtZz6u1temc%3D.1691785125',
    'FPAU': '1.1.660128502.1691785124',
    '_gid': 'GA1.2.1785374437.1692508863',
    'plp_columsCount': 'fourColumns',
    'stc-welcome-message': 'cappedPageCount=2&resolvedDeliveryCountry=IN&userTookActionOnWelcomeMessage=true',
    'bm_mi': 'BEE4358576DB03232C12690B3BE968BC~YAAQnI0sMbwMa/2JAQAAUvRxERQILp7sBpcTGgFX7ew+6B/iZiqH4eEa/cyh3H/y5Rj9csupxJk8z2mnUseGBP0Rq5wIGIU5IExK+a8udahiszkEaT1EtmTXUEv5LuIQfKnjUKEjNMBdEn2LvbgJRD4Blx31YPSgUAimg7o6gxk7JgJ/IFPbVPY5a3roOsSuOJZgWXUMicNhQkvgDfKQaFFBVNhFIdg8wwYcxyvrJ8OqaCqvtKAJL1LbW5/Zb7DN+2zx45P0vVZY8th5aBXrp0R7adwXwWuOlleB0XRBoMNHGjV8leVX6vSzTnpY0VoajFNM19Gyqv84gPJma4DfkuaZVYWfZA==~1',
    'bm_sv': '2E53E429F24B5742BA283AA03597F878~YAAQnI0sMc4Ma/2JAQAA9fdxERQ6lcpvX8Ngoup+v7KlnWLE25xKAcQKpg0JU3LI/+zMvYMQowhUlCxBQYOlSgVTVi3VTaPkSrgd14bCBTHMLTOhlqNgJtGeOAdYq7+1S81UYmYfgLRQH/NR2yvuzDifMTrqs1Ne+mINx6Z3nBlmMH0VoKs46uHe0LUzQc2V6/WJzBOixxNxJWHWBgrc+uwrvMGUm4yvS1fng6m/mBpnwbsOm7H2wvoznrmxHA==~1',
    '_abck': '36099AD0CCA3321EEDBF469186FD9130~0~YAAQnI0sMecWa/2JAQAAllx0EQrmzUgc5riOa45krqrjGXIAgpE+J/Ebkip9fPDGpxoYTh8xSme/uPPFrrf3mVVBVrfLuuVqyRdDEpZ90M31ntM1fI0gljCB2BHdnaBbPp5V2k2UQJDS9IVAvvhx31mgVIfd8BTEzLi1kqQOme2ZNinYNbv0BQydPmWPZwvU0drWPJ1Rp7diXtKMHRT84biQk1n9/RrfiePiwLn6DEwIa+IN1Ut7S/8pI3CDAVP7gUjUEHwDReUDCb6dtzH/mUfiVVWM5VZMLC4PH7qLZBkTn4meAhqVoOChmNfmme2dMneE7IhyaV+i13YAvNXCKi2xnteaSnzBOFhqQUqliTSg3AcKgHkeTFslmEXIBjG8+XMy2CPl9SdBulIIS1ga2e4S2UV8~-1~-1~1692513546',
    'ak_bmsc': '84486972A75235B3B6B96C2C486E9129~000000000000000000000000000000~YAAQnI0sMe8Wa/2JAQAAXl50ERSLA3eZyQy8+FBVI3dsq147yrSzHKsVj7q7zOrTxIA0mM0ca/pns3ZTmKf5hc+GvIqyK6SajbXqFVd8CgZHAIapRIGqRAF4FJ/iX8ZVy0vL5rwOoHB0pKxtsaPSbli5QYozGW+QCRO49BBaiV2wXMkGu+j94qXlFI9MIl6N6Jer1UICqa7kAOw50hSZ9IT3xQJC4L83yp+uy3mXOHUAJ0nePuJaGVVaffAipR6j2zers7P/qMZb6TImGzGM6nUcswGwsnKswm9fbnW9rOtLT1W3qwkisttsLemBWxhMKaKS90lC6r/M/YgCuZv6eFeI1t11TArsN12e7+n/D/EP2B7cICVJcJPC1HiNMtfkDHwUYeau3n24Q+VtH2cdPX6A9oJtcgkbEzpe/t4fXL0EK3cOGgvjWh632l97pFB7246RzrH5z6F+d5LWZ4MTfCCgmYSFs8aV7EtbmhE6FkdtG5y4khOOTCehkBQeVI3BYmIZGGtG4MT7fC70PbQYNbecETUq6tDjkVGN2wx0zLp7YToKC3Tzr77nvqtqU2WtKZK/v3f3xWm2994uGzevonY5wUAV8tX4K4I+',
    'OptanonConsent': 'isGpcEnabled=0&datestamp=Sun+Aug+20+2023+11%3A10%3A27+GMT%2B0530+(India+Standard+Time)&version=202301.2.0&isIABGlobal=false&hosts=&landingPath=https%3A%2F%2Fwww.asos.com%2Fus%2Fmen%2Fnew-in%2Fnew-in-clothing%2Fcat%2F%3Fcid%3D6993&groups=C0001%3A1%2CC0003%3A1%2CC0004%3A1',
    's_pers': '%20s_vnum%3D1693506600672%2526vn%253D2%7C1693506600672%3B%20gpv_p6%3D%2520%7C1692511596893%3B%20eVar225%3D10%7C1692511825041%3B%20visitCount%3D2%7C1692511825046%3B%20gpv_e231%3D6865d4b9-660f-4110-8fbd-96f6f93eee55%7C1692511827846%3B%20s_invisit%3Dtrue%7C1692511827849%3B%20s_nr%3D1692510027851-Repeat%7C1724046027851%3B%20gpv_e47%3Dno%2520value%7C1692511827853%3B%20gpv_p10%3Dmobile%2520us%257Ccategory%2520page%257C6993%2520refined%7C1692511827857%3B',
    '_ga': 'GA1.2.1531882683.1691785125',
    '_cs_id': '0a85cab4-6fff-a1d0-bf4a-58443947e43f.1691785125.2.1692510030.1692508860.1628755191.1725949125160',
    '_cs_s': '6.0.0.1692511830551',
    'FPGSID': '1.1692508861.1692510030.G-H5HS29D9X2.Jcjvk7KGdh2kPvFLupbaPw',
    '_ga_1JR0QCFRSY': 'GS1.1.1692508860.2.1.1692510170.0.0.0',
    'RT': '"z=1&dm=asos.com&si=dad6d179-670b-48eb-8e59-4fc6979a4ee9&ss=llj02ni5&sl=f&tt=yj6&bcn=%2F%2F684d0d45.akstat.io%2F&obo=3&ld=p6nr&nu=n83dor9&cl=sdkz"',
    's_sq': 'asoscomprod%3D%2526c.%2526a.%2526activitymap.%2526page%253Dmobile%252520us%25257Ccategory%252520page%25257C6993%252520refined%2526link%253DLOAD%252520MORE%2526region%253Dplp%2526pageIDType%253D1%2526.activitymap%2526.a%2526.c',
}

headers = {
    'authority': 'www.asos.com',
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en-US,en;q=0.9',
    'asos-c-name': '@asosteam/asos-web-product-listing-page',
    'asos-c-plat': 'web',
    'asos-c-ver': '1.2.0-acba5c25da7b-9637',
    'asos-cid': '9fae88e1-fb35-410c-ace5-8720d282b05d',
    # 'cookie': 'geocountry=IN; AMCVS_C0137F6A52DEAFCC0A490D4C%40AdobeOrg=1; floor=1001; featuresId=9ce5bf3e-f9b2-4e94-a112-a0bdbc7a41db; asos-perx=60a2763bb2bc4a1c83ee51f99db749d3||dc1df1cc80b440708785af535f28987e; s_ecid=MCMID%7C50258212153682277691516959595292256438; s_cc=true; _gcl_au=1.1.660128502.1691785124; bt_stdstatus=NOTSTUDENT; _cs_c=0; bm_sz=8CF28571508B97D5AC35467BBDF9DEC7~YAAQpY0sMcYG6fSJAQAAe6RjERQz+7NFCycBC1YUGj+iVzjJ2BiUxXeKIn0N57ovHo1GPSaJts6dPcpnt41chcqQCgifuLL2Pxul1YH8bZuTU1UNLUD4sLxoNKr/NanvhK9ArKHpmmPJUFBheJUPHq0FNIfGJEQ9t1X6VZ41RynBBhTjobDE3TVEMfGNlB6STW1xaE31dyLtnU434bRvsb1EDzyGnp9O/sLTodq3TYZHajCCCOeJxloiVchMkDJwpFKxoK5Ocyqu000senZp8pSGSXOElxMkgqhaNkgVqD9l~3225141~3687732; siteChromeVersion=au=12&com=12&de=12&dk=12&es=12&fr=12&it=12&nl=12&pl=12&roe=12&row=12&ru=12&se=12&us=12; keyStoreDataversion=d1w1kwo-37; browseCountry=US; browseCurrency=USD; browseLanguage=en-US; browseSizeSchema=US; storeCode=US; asos=PreferredSite=&currencyid=2&currencylabel=USD&topcatid=1001&customerguid=60a2763bb2bc4a1c83ee51f99db749d3; currency=2; asos-b-sdv629=d1w1kwo-37; _s_fpv=true; _cs_mk_aa=0.40190792854765434_1692508860491; AMCV_C0137F6A52DEAFCC0A490D4C%40AdobeOrg=-1303530583%7CMCMID%7C50258212153682277691516959595292256438%7CMCAAMLH-1693113660%7C12%7CMCAAMB-1693113660%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCCIDH%7C0%7CMCOPTOUT-1692516059s%7CNONE%7CvVersion%7C3.3.0%7CMCAID%7CNONE%7CMCSYNCSOP%7C411-19597; FPLC=I9QlralyGQjkQzdtHTUokNNjUD2gTUS3MOJUw5Ko6twHPjoO43ZSRGcK5myYqf99kD5iVbF1FxeEk9kCKHzKV94sTZF3ayOqy1dYWyAk%2FLOXT8nNYVLsexIhoxYdJg%3D%3D; FPID=FPID2.2.WQx9IPa1kbYED12p7SHxVBmX1tG0bnrpNtZz6u1temc%3D.1691785125; FPAU=1.1.660128502.1691785124; _gid=GA1.2.1785374437.1692508863; plp_columsCount=fourColumns; stc-welcome-message=cappedPageCount=2&resolvedDeliveryCountry=IN&userTookActionOnWelcomeMessage=true; bm_mi=BEE4358576DB03232C12690B3BE968BC~YAAQnI0sMbwMa/2JAQAAUvRxERQILp7sBpcTGgFX7ew+6B/iZiqH4eEa/cyh3H/y5Rj9csupxJk8z2mnUseGBP0Rq5wIGIU5IExK+a8udahiszkEaT1EtmTXUEv5LuIQfKnjUKEjNMBdEn2LvbgJRD4Blx31YPSgUAimg7o6gxk7JgJ/IFPbVPY5a3roOsSuOJZgWXUMicNhQkvgDfKQaFFBVNhFIdg8wwYcxyvrJ8OqaCqvtKAJL1LbW5/Zb7DN+2zx45P0vVZY8th5aBXrp0R7adwXwWuOlleB0XRBoMNHGjV8leVX6vSzTnpY0VoajFNM19Gyqv84gPJma4DfkuaZVYWfZA==~1; bm_sv=2E53E429F24B5742BA283AA03597F878~YAAQnI0sMc4Ma/2JAQAA9fdxERQ6lcpvX8Ngoup+v7KlnWLE25xKAcQKpg0JU3LI/+zMvYMQowhUlCxBQYOlSgVTVi3VTaPkSrgd14bCBTHMLTOhlqNgJtGeOAdYq7+1S81UYmYfgLRQH/NR2yvuzDifMTrqs1Ne+mINx6Z3nBlmMH0VoKs46uHe0LUzQc2V6/WJzBOixxNxJWHWBgrc+uwrvMGUm4yvS1fng6m/mBpnwbsOm7H2wvoznrmxHA==~1; _abck=36099AD0CCA3321EEDBF469186FD9130~0~YAAQnI0sMecWa/2JAQAAllx0EQrmzUgc5riOa45krqrjGXIAgpE+J/Ebkip9fPDGpxoYTh8xSme/uPPFrrf3mVVBVrfLuuVqyRdDEpZ90M31ntM1fI0gljCB2BHdnaBbPp5V2k2UQJDS9IVAvvhx31mgVIfd8BTEzLi1kqQOme2ZNinYNbv0BQydPmWPZwvU0drWPJ1Rp7diXtKMHRT84biQk1n9/RrfiePiwLn6DEwIa+IN1Ut7S/8pI3CDAVP7gUjUEHwDReUDCb6dtzH/mUfiVVWM5VZMLC4PH7qLZBkTn4meAhqVoOChmNfmme2dMneE7IhyaV+i13YAvNXCKi2xnteaSnzBOFhqQUqliTSg3AcKgHkeTFslmEXIBjG8+XMy2CPl9SdBulIIS1ga2e4S2UV8~-1~-1~1692513546; ak_bmsc=84486972A75235B3B6B96C2C486E9129~000000000000000000000000000000~YAAQnI0sMe8Wa/2JAQAAXl50ERSLA3eZyQy8+FBVI3dsq147yrSzHKsVj7q7zOrTxIA0mM0ca/pns3ZTmKf5hc+GvIqyK6SajbXqFVd8CgZHAIapRIGqRAF4FJ/iX8ZVy0vL5rwOoHB0pKxtsaPSbli5QYozGW+QCRO49BBaiV2wXMkGu+j94qXlFI9MIl6N6Jer1UICqa7kAOw50hSZ9IT3xQJC4L83yp+uy3mXOHUAJ0nePuJaGVVaffAipR6j2zers7P/qMZb6TImGzGM6nUcswGwsnKswm9fbnW9rOtLT1W3qwkisttsLemBWxhMKaKS90lC6r/M/YgCuZv6eFeI1t11TArsN12e7+n/D/EP2B7cICVJcJPC1HiNMtfkDHwUYeau3n24Q+VtH2cdPX6A9oJtcgkbEzpe/t4fXL0EK3cOGgvjWh632l97pFB7246RzrH5z6F+d5LWZ4MTfCCgmYSFs8aV7EtbmhE6FkdtG5y4khOOTCehkBQeVI3BYmIZGGtG4MT7fC70PbQYNbecETUq6tDjkVGN2wx0zLp7YToKC3Tzr77nvqtqU2WtKZK/v3f3xWm2994uGzevonY5wUAV8tX4K4I+; OptanonConsent=isGpcEnabled=0&datestamp=Sun+Aug+20+2023+11%3A10%3A27+GMT%2B0530+(India+Standard+Time)&version=202301.2.0&isIABGlobal=false&hosts=&landingPath=https%3A%2F%2Fwww.asos.com%2Fus%2Fmen%2Fnew-in%2Fnew-in-clothing%2Fcat%2F%3Fcid%3D6993&groups=C0001%3A1%2CC0003%3A1%2CC0004%3A1; s_pers=%20s_vnum%3D1693506600672%2526vn%253D2%7C1693506600672%3B%20gpv_p6%3D%2520%7C1692511596893%3B%20eVar225%3D10%7C1692511825041%3B%20visitCount%3D2%7C1692511825046%3B%20gpv_e231%3D6865d4b9-660f-4110-8fbd-96f6f93eee55%7C1692511827846%3B%20s_invisit%3Dtrue%7C1692511827849%3B%20s_nr%3D1692510027851-Repeat%7C1724046027851%3B%20gpv_e47%3Dno%2520value%7C1692511827853%3B%20gpv_p10%3Dmobile%2520us%257Ccategory%2520page%257C6993%2520refined%7C1692511827857%3B; _ga=GA1.2.1531882683.1691785125; _cs_id=0a85cab4-6fff-a1d0-bf4a-58443947e43f.1691785125.2.1692510030.1692508860.1628755191.1725949125160; _cs_s=6.0.0.1692511830551; FPGSID=1.1692508861.1692510030.G-H5HS29D9X2.Jcjvk7KGdh2kPvFLupbaPw; _ga_1JR0QCFRSY=GS1.1.1692508860.2.1.1692510170.0.0.0; RT="z=1&dm=asos.com&si=dad6d179-670b-48eb-8e59-4fc6979a4ee9&ss=llj02ni5&sl=f&tt=yj6&bcn=%2F%2F684d0d45.akstat.io%2F&obo=3&ld=p6nr&nu=n83dor9&cl=sdkz"; s_sq=asoscomprod%3D%2526c.%2526a.%2526activitymap.%2526page%253Dmobile%252520us%25257Ccategory%252520page%25257C6993%252520refined%2526link%253DLOAD%252520MORE%2526region%253Dplp%2526pageIDType%253D1%2526.activitymap%2526.a%2526.c',
    'referer': 'https://www.asos.com/us/men/new-in/new-in-clothing/cat/?cid=6993&page=2',
    'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
    'sec-ch-ua-mobile': '?1',
    'sec-ch-ua-platform': '"Android"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',
}

params = {
    'offset': '0',
    'store': 'US',
    'lang': 'en-US',
    'currency': 'USD',
    'rowlength': '4',
    'channel': 'desktop-web',
    'country': 'US',
    'keyStoreDataversion': 'd1w1kwo-37',
    'advertisementsPartnerId': '100716',
    'advertisementsVisitorId': '9ce5bf3e-f9b2-4e94-a112-a0bdbc7a41db',
    'advertisementsOptInConsent': 'true',
    'limit': '72',
}

response = requests.get(
    'https://www.asos.com/api/product/search/v2/categories/6993',
    params=params,
    cookies=cookies,
    headers=headers,
)
results_json=response.json()
results_items=results_json['products']
# print(results_items[0]['name'])
# print(results_items[0]['brandName'])
# print(results_items[0]['price']['current']['text'])
# print(results_items[0]['imageUrl'])
i=1
id=[]
name=[]
brandName=[]
price=[]
imgurl=[]
for result in results_items:
    id.append(i)
    i=i+1
    name.append(result['name'])
    brandName.append(result['brandName'])
    price.append(result['price']['current']['text'])
    imgurl.append(result['imageUrl'])

asos_df = pd.DataFrame({'id':id,'Name':name , 'brand':brandName, 'price':price, 'imgUrl':imgurl})
asos_df=asos_df.set_index(['id'])
asos_df.to_csv('trending.csv')

@app.route('/trending', methods=['GET'])
def trending():
    trend={}
    # item = {}
    with open('trending.csv', 'r') as csvfile:
        datareader = csv.DictReader(
            csvfile)
        trend=list(datareader)
        
    return jsonify(trend[:10])
if __name__ == "__main__":
    app.run(host="127.0.0.1", debug=True, port=8006)