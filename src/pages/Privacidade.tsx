import { contato } from '../config/site.config'
import { useSeo } from '../lib/seo'
import { metaPrivacidade } from '../data/rotas'
import { abrirPreferenciasAnalytics, analyticsConfigurado } from '../lib/analytics'

export default function Privacidade() {
  useSeo(metaPrivacidade)

  return (
    <section className="pagina-texto">
      <div className="container">
        <h1>Política de privacidade</h1>
        <p>
          Esta política explica quais dados o site coleta, para que servem e como você pode pedir a exclusão
          deles, em linha com a Lei Geral de Proteção de Dados (Lei 13.709/2018).
        </p>

        <h2>Quais dados coletamos</h2>
        <ul>
          <li>Dados que você digita nos formulários: nome, empresa, segmento, WhatsApp e mensagem.</li>
          <li>Dados técnicos de navegação, quando ferramentas de medição estiverem ativas.</li>
        </ul>

        <h2>Como os dados são usados</h2>
        <p>
          Os dados dos formulários são usados exclusivamente para responder ao seu contato e preparar um
          orçamento. Este site não vende, aluga nem compartilha dados com terceiros para fins publicitários.
        </p>

        <h2>Formulários e WhatsApp</h2>
        <p>
          Os formulários deste site montam uma mensagem e abrem a conversa no WhatsApp. A partir daí, o
          tratamento das mensagens segue também os termos do próprio WhatsApp.
        </p>

        <h2>Demonstrações</h2>
        <p>
          Nas demonstrações, carrinho, agenda, comparações e formulários funcionam apenas no seu navegador.
          Nada é gravado em servidor e nenhum dado é enviado sem que você clique para enviar.
        </p>

        <h2>Cookies</h2>
        <p>
          O site não usa cookies de publicidade. Com sua autorização, o Google Analytics registra dados
          técnicos de navegação, como páginas visitadas, tipo de dispositivo, origem da visita, rolagens e
          cliques de saída. O endereço IP é anonimizado, sinais de publicidade ficam desativados e os campos
          dos formulários não são enviados à ferramenta. Você pode recusar ou mudar sua escolha a qualquer
          momento.
        </p>
        {analyticsConfigurado() && (
          <button className="btn btn--contorno" type="button" onClick={abrirPreferenciasAnalytics}>
            Alterar preferência de métricas
          </button>
        )}

        <h2>Seus direitos</h2>
        <p>
          Você pode pedir acesso, correção ou exclusão dos seus dados a qualquer momento pelo e-mail{' '}
          <a href={`mailto:${contato.email}`}>{contato.email}</a>.
        </p>
      </div>
    </section>
  )
}
