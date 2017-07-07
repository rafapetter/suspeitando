# Suspeitando

Este projeto realiza análises dos dados disponíveis pelo portal da transparência do município de São Paulo com o intuito de investigar contratos de licitações fechados com diversos fornecedores. Durante a investigação as suspeitas que temos vão desde contratos superfaturados a má qualidade na definição das licitações e serviços prestados.

Este iniciativa é **aberta**, códigos e análises são open-source e estão disponíveis neste repositório. Queremos que outras pessoas no Brasil, independente da região ou município, possam fazer parte dessa iniciativa. Existem várias suspeitas sobre a forma como a administração dos municípios é conduzida, e os valores são grandes o suficiente para afetar a vida de boa parte da população.

Por enquanto as análises são referentes aos contratos mais recentes, 2016 e 2017. Estaremos acrescentando mais análises em breve. Se quiser falar conosco, envie email para **opa@suspeitando.com** .

## Análises

Encontramos aproximadamente R$ 3,8 bilhões referente apenas a soma do valor adicional suspeito de todos os contratos suspeitos que encontramos no período entre 2016 e 2017.

A definição de "**suspeito**" aqui é: contratos onde o valor é 20% acima de outros contratos que tinham no mínimo 95% de similaridade. E a definição de "**similaridade**" foi feita através de um modelo de rede neural, que identifica similaridade semântica na descrição do Objeto do contrato, e do valor médio por dia baseado no período de vigência do contrato. Todos os valores comparados em datas diferentes foram ajustados considerando um taxa de inflação de 15% ao ano.

Para mais detalhes sobre como realizamos a analise inicial dos dados, acesse: **[link](/modelo/Licitacoes_Modelo.ipynb)**

E para entender como processamos estes dados e treinamos uma rede neural para identificar similaridades, acesse: **[link](/analise/licitacoes.ipynb)**
