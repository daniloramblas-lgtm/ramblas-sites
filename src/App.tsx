import { Suspense, lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import Cabecalho from './components/Cabecalho'
import Rodape from './components/Rodape'
import { BotaoWhatsApp, RolarAoNavegar } from './components/Comuns'
import Inicio from './pages/Inicio'
import Modelos from './pages/Modelos'
import ModeloDetalhe from './pages/ModeloDetalhe'
import Privacidade from './pages/Privacidade'
import NaoEncontrada from './pages/NaoEncontrada'

// Cada demonstração vira um pacote separado: a home carrega leve no celular.
const Pizzaria = lazy(() => import('./demos/pizzaria/Pizzaria'))
const Barbearia = lazy(() => import('./demos/barbearia/Barbearia'))
const Escritorio = lazy(() => import('./demos/escritorio/Escritorio'))
const EscritorioServico = lazy(() => import('./demos/escritorio/EscritorioServico'))
const EscritorioArtigo = lazy(() => import('./demos/escritorio/EscritorioArtigo'))
const Concessionaria = lazy(() => import('./demos/concessionaria/Concessionaria'))
const Veiculo = lazy(() => import('./demos/concessionaria/Veiculo'))
const Comparador = lazy(() => import('./demos/concessionaria/Comparador'))

function LayoutPrincipal() {
  return (
    <>
      <a className="pular-para-conteudo" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Cabecalho />
      <main id="conteudo">
        <Outlet />
      </main>
      <Rodape />
      <BotaoWhatsApp />
    </>
  )
}

function Carregando() {
  return (
    <div style={{ minHeight: '60vh', display: 'grid', placeContent: 'center', gap: '1rem', textAlign: 'center' }}>
      <span className="carregando" style={{ margin: '0 auto', width: 22, height: 22 }} aria-hidden="true" />
      <p role="status">Carregando a demonstração…</p>
    </div>
  )
}

export default function App() {
  return (
    <>
      <RolarAoNavegar />
      <Suspense fallback={<Carregando />}>
        <Routes>
          <Route element={<LayoutPrincipal />}>
            <Route path="/" element={<Inicio />} />
            <Route path="/modelos" element={<Modelos />} />
            <Route path="/modelos/:slug" element={<ModeloDetalhe />} />
            <Route path="/privacidade" element={<Privacidade />} />
            <Route path="*" element={<NaoEncontrada />} />
          </Route>

          <Route path="/demonstracao/forno-27" element={<Pizzaria />} />
          <Route path="/demonstracao/distrito-13" element={<Barbearia />} />
          <Route path="/demonstracao/aurea" element={<Escritorio />} />
          <Route path="/demonstracao/aurea/areas/:slug" element={<EscritorioServico />} />
          <Route path="/demonstracao/aurea/artigos/:slug" element={<EscritorioArtigo />} />
          <Route path="/demonstracao/linha-norte" element={<Concessionaria />} />
          <Route path="/demonstracao/linha-norte/veiculo/:slug" element={<Veiculo />} />
          <Route path="/demonstracao/linha-norte/comparar" element={<Comparador />} />
        </Routes>
      </Suspense>
    </>
  )
}
