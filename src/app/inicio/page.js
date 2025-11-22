import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-green-50">
      {/* Header */}
      <header className="bg-green-700 text-white py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Prato Solidário</h1>
          <p className="text-2xl opacity-90 mb-4">Conectando doadores e beneficiários de alimentos</p>
          <p className="text-lg max-w-2xl mx-auto">
            Reduzindo o desperdício de alimentos e combatendo a insegurança alimentar através da tecnologia
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-8">
        {/* Missão */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Nossa Missão</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                O <strong className="text-green-700">Prato Solidário</strong> é um sistema web criado com o propósito de reduzir o desperdício de alimentos e combater a insegurança alimentar por meio da tecnologia.
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Nossa plataforma conecta estabelecimentos comerciais que possuem excedentes alimentares (como restaurantes, supermercados e feirantes) com instituições de caridade, ONGs e cozinhas comunitárias que necessitam desses alimentos.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Tornamos o processo de redistribuição mais ágil, organizado e acessível, contribuindo para um impacto social e ambiental positivo.
              </p>
            </div>
            <div className="w-full h-64 relative rounded-lg overflow-hidden">
              <Image
                src="/images/doacao3.jpg"
                alt="Sistema Prato Solidário - Conexão entre doadores e beneficiários"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Como Funciona */}
        <div className="bg-green-100 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Como o Sistema Funciona</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">Cadastro de Doações</h3>
              <p className="text-gray-700">
                Doadores cadastram alimentos informando tipo, quantidade, validade e localização
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">Busca e Reserva</h3>
              <p className="text-gray-700">
                Beneficiários buscam doações por tipo de alimento, localização ou data
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">Confirmação</h3>
              <p className="text-gray-700">
                Sistema gerencia status das doações e confirma retiradas
              </p>
            </div>
          </div>

          <div className="w-full h-48 relative rounded-lg overflow-hidden mb-6">
            <Image
              src="/images/doacao2.jpg"
              alt="Processo de doação - Prato Solidário"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Público-Alvo */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Para Quem é o Prato Solidário</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold text-green-700 mb-4 text-center">Doadores</h3>
              <ul className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Restaurantes, supermercados e padarias
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Feirantes e estabelecimentos comerciais
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Empresas com excedentes alimentares
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Pessoas físicas com alimentos para doar
                </li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold text-green-700 mb-4 text-center">Beneficiários</h3>
              <ul className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  ONGs e instituições de caridade
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Cozinhas comunitárias
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Organizações que distribuem alimentos
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Comunidades em situação de vulnerabilidade
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full h-48 relative rounded-lg overflow-hidden mt-6">
            <Image
              src="/images/doacao1.jpg"
              alt="Doadores e beneficiários - Prato Solidário"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Tecnologia */}
        <div className="bg-green-100 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Tecnologia</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Desenvolvemos uma plataforma moderna e eficiente utilizando as melhores tecnologias do mercado:
              </p>
              <ul className="text-gray-700 space-y-3 text-lg">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <strong>Frontend:</strong> React.js com Next.js
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <strong>Backend:</strong> API REST desenvolvida em Flask (Python)
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <strong>Banco de Dados:</strong> PostgreSQL
                </li>
              </ul>
            </div>
            <div className="w-full h-64 relative rounded-lg overflow-hidden">
              <Image
                src="/images/doacao5.jpg"
                alt="Tecnologia Prato Solidário"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Sobre Nós */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 border-l-4 border-green-600">
          <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Sobre o Projeto</h2>
          
          <div className="space-y-6 text-lg text-gray-700">
            <p className="leading-relaxed">
              O <strong className="text-green-700">Prato Solidário</strong> busca unir tecnologia e solidariedade para reduzir o desperdício de alimentos e fortalecer redes de apoio social.
            </p>

            <div className="w-full h-64 relative rounded-lg overflow-hidden my-6">
              <Image
                src="/images/doacao4.jpg"
                alt="Projeto Prato Solidário"
                fill
                className="object-cover"
              />
            </div>

            <p className="leading-relaxed">
              Com um sistema simples, funcional e acessível, facilitamos a conexão entre doadores e beneficiários, promovendo uma sociedade mais sustentável e solidária. Nossa plataforma inclui funcionalidades como cadastro de doações, sistema de busca e filtros, gerenciamento de status, notificações e histórico completo.
            </p>

            <p className="leading-relaxed font-semibold text-green-700 text-center">
              Juntos, podemos fazer a diferença na vida de milhares de pessoas enquanto combatemos o desperdício alimentar.
            </p>
          </div>
        </div>

        {/* Chamada Final */}
        <div className="text-center py-12 bg-green-700 rounded-lg text-white">
          <h3 className="text-3xl font-bold mb-4">Junte-se ao Prato Solidário</h3>
          <p className="text-xl max-w-2xl mx-auto mb-6">
            Seja um doador ou beneficiário e faça parte dessa rede de solidariedade
          </p>
          <div className="text-lg opacity-90">
            <p>Email: contato@pratosolidario.org</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-xl font-semibold mb-2">Prato Solidário</p>
          <p className="opacity-90 mb-4">Sistema de Conexão entre Doadores e Beneficiários de Alimentos</p>
          <div className="text-sm opacity-75">
            <p>Reduzindo o desperdício, combatendo a fome, construindo comunidade</p>
          </div>
        </div>
      </footer>
    </div>
  );
}