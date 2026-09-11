import { Link } from 'react-router-dom'
import { contato, servicos } from '../config/site.config'
import { modelos } from '../data/modelos'
import { linkWhatsApp } from '../lib/whatsapp'

export default function Rodape() {
  return (
    <footer className="rodape">
      <div className="container">
        <div className="rodape__grade">
          <div>
            <Link to="/" className="logo">
              Ramblas <span>Sites</span>
            </Link>
            <p style={{ marginTop: '1rem', maxWidth: '34ch' }}>
              Sites e sistemas sob medida para pequenos e médios negócios. {contato.atendimento}.
            </p>
          </div>

          <div>
            <h4>Serviços</h4>
            <ul>
              {servicos.slice(0, 6).map((s) => (
                <li key={s.nome}>
                  <Link to="/#servicos">{s.nome}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Modelos</h4>
            <ul>
              {modelos.map((m) => (
                <li key={m.slug}>
                  <Link to={`/modelos/${m.slug}`}>{m.nome}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Contato</h4>
            <ul>
              <li>
                <a href={linkWhatsApp()} target="_blank" rel="noopener">
                  WhatsApp {contato.whatsappExibicao}
                </a>
              </li>
              <li>
                <a href={`mailto:${contato.email}`}>{contato.email}</a>
              </li>
              {contato.linkedin && (
                <li>
                  <a href={contato.linkedin} target="_blank" rel="noopener">
                    LinkedIn
                  </a>
                </li>
              )}
              <li>
                <Link to="/privacidade">Política de privacidade</Link>
              </li>
              <li>{contato.cidade}</li>
            </ul>
          </div>
        </div>

        <p className="rodape__aviso">
          Os modelos apresentados neste site são conceituais e utilizam empresas fictícias, criadas apenas
          para demonstrar possibilidades de layout e funcionalidades. Não representam clientes, casos reais
          ou resultados obtidos.
        </p>

        <div className="rodape__base">
          <span>© {new Date().getFullYear()} Ramblas Sites</span>
          <span>Feito com React, Vite e TypeScript</span>
        </div>
      </div>
    </footer>
  )
}
