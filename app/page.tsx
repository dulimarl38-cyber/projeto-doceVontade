'use client'

import { useState, useCallback, useEffect } from 'react'
import { ArrowUpRight, Camera, Menu, MessageCircle, Sparkles, X } from 'lucide-react'

const business = {
  name: 'Doce Vontade',
  instagram: 'https://www.instagram.com/docevontade.oficial/',
  whatsappNumber: '11954276852',
  whatsappMessage: 'Olá! Conheci a Doce Vontade pelo site e gostaria de consultar informações sobre encomendas.',
  address: '',
}

const whatsappUrl = (context?: string) => {
  if (!business.whatsappNumber) return '#contato'
  const message = context ? `${business.whatsappMessage} Tenho interesse em ${context}.` : business.whatsappMessage
  return `https://wa.me/55${business.whatsappNumber}?text=${encodeURIComponent(message)}`
}

function Frame() {
  return <div className="frame" aria-hidden="true"><span className="frame-corner frame-corner-tl" /><span className="frame-corner frame-corner-tr" /><span className="frame-corner frame-corner-bl" /><span className="frame-corner frame-corner-br" /></div>
}

function Header() {
  const [open, setOpen] = useState(false)
  const links = [['A experiência', '#experiencia'], ['Delícias', '#delicias'], ['Galeria', '#galeria'], ['Encomendas', '#encomendas']]
  return <header className="site-header"><nav className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Navegação principal">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}<a href={business.instagram} target="_blank" rel="noreferrer" className="nav-instagram"><Camera size={15} /> Instagram</a></nav><button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open}>{open ? <X size={21} /> : <Menu size={21} />}</button></header>
}

const categories = [
  { title: 'Bolos', eyebrow: 'Para celebrar', text: 'Criações delicadas para transformar cada fatia em uma memória.', color: 'blush' },
  { title: 'Doces', eyebrow: 'Pequenos encantos', text: 'Detalhes doces, feitos à mão para presentear e surpreender.', color: 'sage' },
  { title: 'Salgados', eyebrow: 'Para compartilhar', text: 'Opções preparadas com capricho para encontros especiais.', color: 'cream' },
  { title: 'Kits especiais', eyebrow: 'Do seu jeito', text: 'Composições pensadas para deixar seu momento ainda mais bonito.', color: 'rose' },
]

// Fotografias reais disponíveis na pasta FOTOS do projeto, copiadas para public/images.
// Cada imagem é utilizada uma única vez, respeitando as 20 posições da galeria.
const productImages = [
  '/images/hero-cake.png',
  '/images/5-ovo.png',
  '/images/bolo-choc-quadr.png',
  '/images/bolo-chocolate.png',
  '/images/bolo-mor-quadr.png',
  '/images/bolo-mor-torre.png',
  '/images/bolo-rosas-chan-quadr.png',
  '/images/bolosuper.png',
  '/images/brigadeirao.png',
  '/images/brigadeirocoração.png',
  '/images/coxinhachoc.png',
  '/images/cx-doce.png',
  '/images/docinho-close.png',
  '/images/ovochocmara.png',
  '/images/paodemel.png',
  '/images/trav-4-doces.png',
  '/images/travess-doce-color.png',
  '/images/travess-doce-lindo.png',
  '/images/travessa-doce.png',
  '/images/urso.png',
]

const productDetails: Record<string, { name: string; category: string; description: string; alt: string }> = {
  'hero-cake.png': {
    name: 'Bolo floral',
    category: 'Bolos',
    description: 'Bolo de camadas com flores em tons suaves e acabamento delicado.',
    alt: 'Bolo de camadas decorado com flores em tons de rosa',
  },
  '5-ovo.png': {
    name: 'Ovos de colher',
    category: 'Ovos de colher',
    description: 'Seleção de ovos de colher com coberturas cremosas e confeitos variados.',
    alt: 'Seleção de ovos de colher com coberturas de chocolate e creme',
  },
  'bolo-choc-quadr.png': {
    name: 'Brigadeiro de travessa',
    category: 'Doces',
    description: 'Sobremesa cremosa de chocolate finalizada com confeitos.',
    alt: 'Sobremesa de chocolate em travessa com confeitos',
  },
  'bolo-chocolate.png': {
    name: 'Sobremesa de chocolate',
    category: 'Doces',
    description: 'Sobremesa de chocolate em taça, finalizada com raspas.',
    alt: 'Sobremesa de chocolate em taça decorada com raspas',
  },
  'bolo-mor-quadr.png': {
    name: 'Bolo de morango',
    category: 'Bolos',
    description: 'Bolo branco decorado com morangos frescos.',
    alt: 'Bolo branco decorado com morangos frescos',
  },
  'bolo-mor-torre.png': {
    name: 'Bolo de morango com chantilly',
    category: 'Bolos',
    description: 'Bolo alto com cobertura branca e morangos frescos.',
    alt: 'Bolo alto com cobertura branca e morangos frescos',
  },
  'bolo-rosas-chan-quadr.png': {
    name: 'Bolo decorado com rosas',
    category: 'Bolos',
    description: 'Bolo retangular com acabamento branco e flores de confeitaria.',
    alt: 'Bolo retangular branco decorado com flores de confeitaria',
  },
  'bolosuper.png': {
    name: 'Bolo temático de super-herói',
    category: 'Bolos',
    description: 'Bolo vermelho e amarelo com decoração temática de super-herói.',
    alt: 'Bolo temático de super-herói com decoração vermelha e amarela',
  },
  'brigadeirao.png': {
    name: 'Brigadeirão',
    category: 'Doces',
    description: 'Brigadeirão decorado com raspas de chocolate.',
    alt: 'Brigadeirão decorado com raspas de chocolate',
  },
  'brigadeirocoração.png': {
    name: 'Brigadeiros com coração',
    category: 'Doces',
    description: 'Brigadeiros cobertos com confeitos de chocolate e corações.',
    alt: 'Brigadeiros cobertos com confeitos de chocolate e corações vermelhos',
  },
  'coxinhachoc.png': {
    name: 'Coxinha de chocolate',
    category: 'Doces',
    description: 'Doce em formato de coxinha, coberto com confeitos de chocolate.',
    alt: 'Doce em formato de coxinha coberto com confeitos de chocolate',
  },
  'cx-doce.png': {
    name: 'Caixa de brigadeiros',
    category: 'Doces',
    description: 'Caixa presenteável com brigadeiros de chocolate, rosa e branco.',
    alt: 'Caixa com brigadeiros de chocolate, rosa e branco',
  },
  'docinho-close.png': {
    name: 'Brigadeiros coloridos',
    category: 'Doces',
    description: 'Brigadeiros decorados com confeitos coloridos e de chocolate.',
    alt: 'Brigadeiros decorados com confeitos coloridos e de chocolate',
  },
  'ovochocmara.png': {
    name: 'Ovo de colher de chocolate',
    category: 'Ovos de colher',
    description: 'Ovo de colher com camadas de chocolate e creme claro.',
    alt: 'Ovo de colher com camadas de chocolate e creme claro',
  },
  'paodemel.png': {
    name: 'Doces de chocolate',
    category: 'Doces',
    description: 'Doces de chocolate decorados com cobertura clara.',
    alt: 'Doces de chocolate decorados com cobertura clara',
  },
  'trav-4-doces.png': {
    name: 'Trio de doces de chocolate',
    category: 'Doces',
    description: 'Doces redondos de chocolate com diferentes coberturas.',
    alt: 'Doces redondos de chocolate com diferentes coberturas',
  },
  'travess-doce-color.png': {
    name: 'Brigadeiros coloridos',
    category: 'Doces',
    description: 'Brigadeiros variados organizados em uma caixa colorida.',
    alt: 'Caixa com brigadeiros variados e confeitos coloridos',
  },
  'travess-doce-lindo.png': {
    name: 'Brigadeiros coloridos em caixa',
    category: 'Doces',
    description: 'Seleção de brigadeiros coloridos em forminhas decorativas.',
    alt: 'Caixa com brigadeiros coloridos em forminhas decorativas',
  },
  'travessa-doce.png': {
    name: 'Caixa de doces variados',
    category: 'Doces',
    description: 'Caixa com doces variados em cores e acabamentos diferentes.',
    alt: 'Caixa com doces variados em cores e acabamentos diferentes',
  },
  'urso.png': {
    name: 'Doce temático de urso',
    category: 'Doces',
    description: 'Doce de chocolate com acabamento facetado e detalhes dourados.',
    alt: 'Doce de chocolate facetado com detalhes dourados',
  },
}

const products = productImages.map((image, index) => {
  const fileName = image.split('/').pop() ?? ''
  const details = productDetails[fileName]
  return {
    id: `produto-${String(index + 1).padStart(2, '0')}`,
    name: details?.name ?? 'Produto em identificação',
    category: details?.category ?? 'Doces',
    image,
    description: details?.description ?? 'Descrição do produto em confirmação.',
    price: undefined,
    alt: details?.alt ?? `Imagem de ${fileName.replace('.png', '').replace('-', ' ')}`,
    filled: true,
  }
})

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Visualização ampliada da imagem"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <button className="lightbox-close" onClick={onClose} aria-label="Fechar visualização ampliada">
        <X size={24} />
      </button>
      <img className="lightbox-image" src={src} alt={alt} />
    </div>
  )
}

function SectionKicker({ children }: { children: React.ReactNode }) { return <p className="kicker"><span />{children}<span /></p> }

export default function Page() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
  const [lightboxAlt, setLightboxAlt] = useState<string>('')

  const openLightbox = (src: string, alt: string) => {
    setLightboxSrc(src)
    setLightboxAlt(alt)
  }

  const closeLightbox = () => {
    setLightboxSrc(null)
    setLightboxAlt('')
  }

  return (
    <main id="inicio" className="site-shell">
      <Frame />
      <Header />
      <section className="hero section-pad">
        <div className="hero-copy">
          <img className="hero-logo" src="/images/logo.png" alt="Logo Doce Vontade" width="260" height="260" />
          <p className="eyebrow">Confeitaria artesanal</p>
          <h1>Pequenos encantos,<br /><em>feitos para adoçar</em><br />seus momentos.</h1>
          <p className="hero-text">Bolos, doces e delícias preparados com carinho para transformar momentos especiais em lembranças inesquecíveis.</p>
          <div className="hero-actions">
            <a href={whatsappUrl()} className="button button-primary"><MessageCircle size={17} /> Fazer uma encomenda</a>
            <a href="#delicias" className="button button-ghost">Conhecer as delícias <ArrowUpRight size={16} /></a>
          </div>
        </div>
        <div className="hero-art">
          <div className="art-wash" />
          <img src="/images/hero-cake.png" alt="Bolo delicado decorado com flores em tons de rosa" />
          <span className="art-caption">feito à mão<br /><i>com carinho</i></span>
          <div className="flower flower-one">✿</div>
          <div className="flower flower-two">❋</div>
        </div>
      </section>

      <section id="experiencia" className="experience section-pad">
        <div className="experience-mark"><Sparkles size={18} /><span>01</span></div>
        <div className="experience-copy">
          <SectionKicker>A experiência Doce Vontade</SectionKicker>
          <h2>Uma pausa para<br /><em>sentir o doce.</em></h2>
        </div>
        <div className="experience-text">
          <p>Na Doce Vontade, cada criação nasce para celebrar o que realmente importa: os encontros, os gestos de carinho e os instantes que merecem ser guardados.</p>
          <p className="muted">Tudo é pensado com delicadeza — da primeira ideia ao último detalhe da sua mesa.</p>
        </div>
      </section>

      <section id="delicias" className="delicacies section-pad">
        <div className="section-heading">
          <div>
            <SectionKicker>02 · Nossas delícias</SectionKicker>
            <h2>Escolha seu<br /><em>momento doce.</em></h2>
          </div>
          <p>Conte com a gente para criar algo especial, do jeitinho que você imaginou.</p>
        </div>
        <div className="category-grid">
          {categories.map((item, i) => (
            <a key={item.title} href={whatsappUrl(item.title)} className={`category-card ${item.color}`}>
              <span className="card-number">0{i + 1}</span>
              <div className="card-illustration"><span>{i === 0 ? '✦' : i === 1 ? '❀' : i === 2 ? '⌁' : '✧'}</span></div>
              <div>
                <p className="card-eyebrow">{item.eyebrow}</p>
                <h3>{item.title}</h3>
                <p className="card-text">{item.text}</p>
                <span className="card-link">Consultar opções <ArrowUpRight size={15} /></span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="galeria" className="gallery section-pad">
        <div className="gallery-intro">
          <SectionKicker>03 · Galeria de criações</SectionKicker>
          <h2>Feito com carinho,<br /><em>para guardar.</em></h2>
          <p>Uma coleção em construção para apresentar cada criação com o espaço e o cuidado que ela merece.</p>
          <a href={whatsappUrl()} className="text-link">Começar uma conversa <ArrowUpRight size={15} /></a>
        </div>
        <div className="product-gallery" aria-label="Galeria de produtos">
          <div className="gallery-note">20 espaços preparados<br /><em>para suas delícias</em></div>
          {products.map((product) => (
            <article className={`product-card ${product.filled ? 'is-filled' : 'is-pending'}`} key={product.id}>
              {product.image ? (
                <div className="product-image-wrapper" onClick={() => openLightbox(product.image, product.alt)}>
                  <img
                    src={product.image}
                    alt={product.alt}
                    loading={product.id === 'produto-01' ? 'eager' : 'lazy'}
                    width="640"
                    height="720"
                  />
                </div>
              ) : (
                <div className="product-placeholder" aria-hidden="true">
                  <span>{product.category === 'Bolos' ? '✦' : product.category === 'Doces' ? '❀' : product.category === 'Salgados' ? '⌁' : '✧'}</span>
                </div>
              )}
              <div className="product-caption">
                <span className="product-category">{product.category}</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                {product.price && <strong>{product.price}</strong>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="encomendas" className="order-section section-pad">
        <SectionKicker>04 · Como encomendar</SectionKicker>
        <h2>Seu momento começa<br /><em>com uma conversa.</em></h2>
        <div className="steps">
          {['Conheça nossas delícias', 'Conte o que você imaginou', 'Informe data e detalhes', 'Confirme tudo com a gente'].map((step, i) => (
            <div className="step" key={step}>
              <span>0{i + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
        <a href={whatsappUrl()} className="button button-primary"><MessageCircle size={17} /> Falar pelo WhatsApp</a>
      </section>

      <section id="contato" className="contact section-pad">
        <div>
          <SectionKicker>Vamos conversar?</SectionKicker>
          <h2>Um doce prazer<br /><em>conhecer você.</em></h2>
        </div>
        <div className="contact-details">
          <a href={whatsappUrl()} className="contact-line"><MessageCircle size={19} /><span>Faça sua encomenda<br /><strong>pelo WhatsApp</strong></span><ArrowUpRight size={18} /></a>
          <a href={business.instagram} target="_blank" rel="noreferrer" className="contact-line"><Camera size={19} /><span>Acompanhe a gente<br /><strong>@docevontade.oficial</strong></span><ArrowUpRight size={18} /></a>
        </div>
      </section>

      <footer className="footer">
        <p>Doces momentos, feitos com intenção.</p>
        <a href={business.instagram} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={14} /></a>
        <small>© {new Date().getFullYear()} Doce Vontade</small>
      </footer>
      <a className="floating-whatsapp" href={whatsappUrl()} aria-label="Fazer encomenda pelo WhatsApp"><MessageCircle size={21} /></a>

      {lightboxSrc && <Lightbox src={lightboxSrc} alt={lightboxAlt} onClose={closeLightbox} />}
    </main>
  )
}
