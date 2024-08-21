from flask import Flask, jsonify
import pandas as pd

app = Flask(__name__)

def read_excel():
    # Substitua 'produtos.xlsx' pelo caminho do seu arquivo Excel
    df = pd.read_excel('store-products.xlsx')
    # Converte os dados do DataFrame para uma lista de dicionários
    products = df.to_dict(orient='records')
    return products

@app.route('/store-products', methods=['GET'])
def get_products():
    products = read_excel()
    return jsonify(products)


if __name__ == '__main__':
    app.run(debug=True)
    
