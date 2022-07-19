import pandas as pd
  
def buildRegionDataSet(filePath:str, destinationFilePath:str):
    df = pd.read_csv(filePath)
    columns = [
        'data','stato','denominazione_regione','codice_regione','variazione_totale_positivi','totale_positivi',
        'nuovi_positivi','dimessi_guariti','deceduti','totale_casi','tamponi']
    df = df[columns]

    dt_data = df.loc[:,columns]
    dt_data[['date','time']] = df['data'].str.split('T',expand=True)
    d_data = dt_data.loc[:,columns + ['date']]
    d_data[['year','month','day']]=dt_data['date'].str.split('-',expand = True)

    d_data = d_data.rename(columns={
        'data':'reporting_date',
        'stato':'country',
        'codice_regione':'region_code',
        'denominazione_regione':'region',
        'variazione_totale_positivi':'delta_infected',
        'nuovi_positivi':'new_infected',
        'dimessi_guariti':'discharged_healed',
        'deceduti':'deaths',
        'totale_positivi':'total_infected',
        'totale_casi':'total',
        'tamponi':'swabs'
        })
    
    
    result_22 = buildYearData(d_data,2022)
    result_21 = buildYearData(d_data,2021)
    result_20 = buildYearData(d_data,2020)

    result = pd.concat([result_22,result_21,result_20])

    # print(result.head().to_string())

    result.to_csv(destinationFilePath+'.csv')

    result.to_parquet(destinationFilePath+'.parquet')


    #print(d_data.head().to_string())

def buildYearData(df,year):
    data_prec = df.query(f"year == '{year - 1}'")
    data_prec = data_prec.rename(columns={
        'total_infected':'total_infected_prev',
        'new_infected':'new_infected_prev',
        'delta_infected':'delta_infected_prev',
        'discharged_healed':'discharged_healed_prev',
        'total':'total_prev',
        'deaths':'deaths_prev',
        'swabs':'swabs_prev'
        })
    data =  df.query(f"year == '{year}'")
    data_prec = data_prec.drop(columns=['reporting_date','year','date'])
    
    return pd.merge(data,data_prec, how='left',on=['month','day','region','country','region_code'])


