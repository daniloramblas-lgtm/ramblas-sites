import { Link } from 'react-router-dom'
import { enderecoLinhaNorte } from './dados'
import { linkWhatsApp } from '../../lib/whatsapp'

export function CabecalhoLN() {
  return (
    <header className="ln-cabecalho">
      <div className="container ln-cabecalho__interno">
        <Link className="ln-logo" to="/demonstracao/linha-norte">
          <i aria-hidden="true" />
          Linha Norte Motors
        </Link>
        <nav className="ln-nav" aria-label="Navegação da concessionária">
          <Link to="/demonstracao/linha-norte#estoque">Estoque</Link>
          <Link to="/demonstracao/linha-norte#avaliacao">Avaliar meu usado</Link>
          <Link to="/demonstracao/linha-norte#test-drive">Test-drive</Link>
          <Link to="/demonstracao/linha-norte#painel">Painel de estoque</Link>
        </nav>
        <a
          className="ln-btn ln-btn--azul ln-btn--pequeno"
          href={linkWhatsApp('Olá! Vim pela demonstração da Linha Norte Motors.')}
          target="_blank"
          rel="noopener"
        >
          Falar pelo WhatsApp
        </a>
      </div>
    </header>
  )
}

export function RodapeLN() {
  return (
    <footer className="ln-rodape">
      <div className="container">
        <p style={{ maxWidth: '78ch' }}>
          Linha Norte Motors é uma empresa fictícia. Projeto demonstrativo — empresa fictícia criada para
          apresentar possibilidades. Veículos, preços, quilometragens e condições de financiamento são
          ilustrativos e não representam oferta.
        </p>
        <p>{enderecoLinhaNorte}</p>
        <p>
          <Link to="/modelos/linha-norte">Sobre este modelo</Link> · <Link to="/">Ramblas Sites</Link> ·{' '}
          <Link to="/privacidade">Política de privacidade</Link>
        </p>
      </div>
    </footer>
  )
}
