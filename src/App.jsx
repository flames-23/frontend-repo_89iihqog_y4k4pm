import React, { useEffect, useMemo, useRef, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { CheckSquare, Users, IdCard, Calendar, MessageSquare, BarChart3, Check } from 'lucide-react'

// Neon cursor
function NeonCursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 300, damping: 30 })
  const springY = useSpring(y, { stiffness: 300, damping: 30 })
  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])
  return (
    <motion.div className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:block" style={{ translateX: springX, translateY: springY }}>
      <div className="w-8 h-8 rounded-full border border-[#0386D9]/70 shadow-[0_0_30px_4px_rgba(3,134,217,0.35)] bg-[#0386D9]/10 backdrop-blur-sm" />
    </motion.div>
  )
}

// Floating particles
function Particles({ count = 60 }) {
  const particles = useMemo(() => Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 3,
    duration: 8 + Math.random() * 10,
    delay: Math.random() * 8
  })), [count])
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.span key={p.id} className="absolute rounded-full bg-[#60A5FA]" style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%`, filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.8))' }} initial={{ opacity: 0.2, y: 0 }} animate={{ opacity: [0.2, 0.8, 0.2], y: [0, -20, 0] }} transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }} />
      ))}
    </div>
  )
}

function StatCard({ label, value, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    if (!isInView) return
    const end = typeof value === 'number' ? value : parseInt(String(value).replace(/[^0-9]/g, ''))
    const duration = 1500
    const startTime = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      setDisplay(Math.floor(end * progress))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, value])
  const text = typeof value === 'string' && value.includes('%') ? `${display}%` : display.toLocaleString()
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay, duration: 0.6 }} className="backdrop-blur-md bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white/90 shadow-[0_0_20px_rgba(3,134,217,0.25)]">
      <div className="text-2xl font-bold">{text}</div>
      <div className="text-xs opacity-80">{label}</div>
    </motion.div>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4HIlOdlXYYkZW66z/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 pointer-events-none" />
      <Particles />
      <div className="relative z-10 container mx-auto px-6 pt-28 pb-16 flex flex-col items-center text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          Control Total de tu Seguridad Corporativa
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="mt-4 max-w-3xl text-lg sm:text-xl text-white/90">
          Gestiona visitantes, empleados, acceso y seguridad desde una plataforma unificada e inteligente
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-8 flex items-center gap-4">
          <a href="#pricing" className="px-6 py-3 rounded-lg font-semibold bg-[#0386D9] hover:bg-[#0a76b8] text-white shadow-[0_10px_30px_rgba(3,134,217,0.35)] transition-colors">Comenzar Ahora</a>
          <a href="#demo" className="px-6 py-3 rounded-lg font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors">Ver Demo en Vivo</a>
        </motion.div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Visitantes Activos" value={1247} />
          <StatCard label="Empresas confían en nosotros" value={15} />
          <StatCard label="Uptime" value={'99%'} />
        </div>
      </div>
    </section>
  )
}

function Features() {
  const items = [
    { icon: CheckSquare, title: 'Gestión de Visitantes', points: ['Check-in/out automatizado con QR', 'Notificaciones en tiempo real'] },
    { icon: Users, title: 'Control de Empleados', points: ['Base de datos centralizada', 'Roles y permisos granulares'] },
    { icon: IdCard, title: 'Sistema de Tarjetas', points: ['Asignación automática e inteligente', 'Tracking en tiempo real'] },
    { icon: Calendar, title: 'Gestión de Citas', points: ['Agendamiento inteligente', 'Mapas de ubicación en vivo'] },
    { icon: MessageSquare, title: 'Chat en Tiempo Real', points: ['Comunicación instantánea', 'Salas por empresa'] },
    { icon: BarChart3, title: 'Analytics & Reportes', points: ['Dashboard interactivo', 'Métricas en tiempo real'] },
  ]
  return (
    <section className="relative bg-black text-white py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Características Principales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((f, idx) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ delay: idx * 0.05 }} className="group relative backdrop-blur-md bg-white/10 border border-white/15 rounded-2xl p-6 shadow-[0_0_30px_rgba(3,134,217,0.15)] hover:shadow-[0_0_40px_rgba(3,134,217,0.35)] transition-shadow">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#0386D9]/15 border border-[#0386D9]/30 text-[#60A5FA]"><f.icon size={24} /></div>
                <h3 className="text-xl font-semibold">{f.title}</h3>
              </div>
              <ul className="mt-4 space-y-2 text-white/85">
                {f.points.map(p => (
                  <li key={p} className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#34D399] shadow-[0_0_10px_rgba(52,211,153,0.8)]"></span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="absolute inset-0 rounded-2xl pointer-events-none border border-transparent group-hover:border-[#0386D9]/50 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DashboardPreview() {
  const Tile = ({ children, className = '' }) => (
    <div className={`backdrop-blur-md bg-white/10 border border-white/15 rounded-2xl p-4 ${className}`}>{children}</div>
  )
  return (
    <section id="demo" className="relative bg-gradient-to-b from-black to-[#020617] text-white py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Vista Previa Interactiva</h2>
        <div className="grid grid-cols-12 gap-4">
          <Tile className="col-span-12 md:col-span-7 h-56">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="w-full h-full">
              <div className="h-full w-full rounded-xl bg-gradient-to-tr from-[#0b1630] to-[#0a2045] relative overflow-hidden">
                <div className="absolute bottom-4 left-4 right-4 flex items-end gap-2">
                  {[20,40,25,70,55,80,60].map((h,i) => (
                    <div key={i} className="flex-1 bg-[#0386D9]/20 rounded-t-md" style={{ height: `${h}%` }}>
                      <div className="w-full h-full bg-[#0386D9]/60" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </Tile>
          <Tile className="col-span-12 md:col-span-5 h-56">
            <div className="h-full w-full rounded-xl bg-gradient-to-tr from-[#0b1630] to-[#0a2045] p-4">
              <div className="space-y-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                    <span className="text-sm">Notificación #{i}</span>
                    <span className="text-xs text-white/70">hace {i} min</span>
                  </div>
                ))}
              </div>
            </div>
          </Tile>
          <Tile className="col-span-12 md:col-span-6 h-72">
            <div className="h-full w-full rounded-xl bg-gradient-to-tr from-[#0b1630] to-[#0a2045] relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_30%,#60A5FA_0%,transparent_30%),radial-gradient(circle_at_70%_60%,#34D399_0%,transparent_25%)]" />
              {[...Array(8)].map((_, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} animate={{ x: [0, 10, -5, 0] }} transition={{ duration: 6 + i, repeat: Infinity }} className="absolute w-2 h-2 rounded-full bg-[#F59E0B] shadow-[0_0_10px_2px_rgba(245,158,11,0.7)]" style={{ left: `${10 + i*10}%`, top: `${20 + (i%5)*12}%` }} />
              ))}
            </div>
          </Tile>
          <Tile className="col-span-12 md:col-span-6 h-72">
            <div className="h-full w-full rounded-xl bg-gradient-to-tr from-[#0b1630] to-[#0a2045] p-4">
              <div className="grid grid-cols-2 gap-3 h-full">
                {["Visitantes", "Empleados", "Alertas", "Puertas"].map((t, i) => (
                  <div key={t} className="rounded-lg bg-white/5 border border-white/10 p-3 flex flex-col">
                    <span className="text-sm text-white/70">{t}</span>
                    <span className="mt-auto text-2xl font-bold text-white">{Math.floor(Math.random()*100)}</span>
                  </div>
                ))}
              </div>
            </div>
          </Tile>
        </div>
      </div>
    </section>
  )
}

function Security() {
  const items = [
    { emoji: '🔐', text: 'Autenticación 2FA con SMS' },
    { emoji: '🛡️', text: 'Encriptación end-to-end' },
    { emoji: '📱', text: 'Notificaciones push en tiempo real' },
    { emoji: '🔄', text: 'Backups automáticos' },
    { emoji: '👁️', text: 'Logs de auditoría completos' },
  ]
  return (
    <section className="relative bg-[radial-gradient(circle_at_20%_20%,rgba(3,134,217,0.25)_0%,transparent_40%),radial-gradient(circle_at_80%_30%,rgba(96,165,250,0.2)_0%,transparent_40%)] bg-black text-white py-20">
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: 'linear-gradient(120deg, transparent 0 95%, rgba(3,134,217,0.35) 95% 100%), linear-gradient(0deg, transparent 0 95%, rgba(96,165,250,0.25) 95% 100%)', backgroundSize: '30px 30px' }} />
      <div className="container mx-auto px-6 relative">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Seguridad de Nivel Empresarial</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((i, idx) => (
            <motion.div key={i.text} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }} className="backdrop-blur-md bg-white/10 border border-white/15 rounded-2xl p-6">
              <div className="text-3xl">{i.emoji}</div>
              <div className="mt-2 font-medium">{i.text}</div>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-center gap-3 opacity-80">
          {['ISO 27001', 'SOC 2', 'GDPR'].map(b => (
            <span key={b} className="px-3 py-1 rounded-full border border-white/20 text-xs">{b}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

function UseCases() {
  const cases = [
    { company: 'TechCorp Solutions', quote: 'Reducimos tiempo de check-in en 80%' },
    { company: 'SecureNet Systems', quote: 'Control total de accesos en múltiples sedes' },
    { company: 'GlobeWorks', quote: 'Visibilidad en tiempo real de visitantes y empleados' }
  ]
  return (
    <section className="relative bg-black text-white py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Casos de Uso</h2>
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-4 min-w-max">
            {cases.map((c, i) => (
              <motion.div key={c.company} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="min-w-[280px] md:min-w-[360px] backdrop-blur-md bg-white/10 border border-white/15 rounded-2xl p-6">
                <div className="text-lg font-semibold">{c.company}</div>
                <p className="text-white/80 mt-2">“{c.quote}”</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const [yearly, setYearly] = useState(true)
  const tiers = [
    { name: 'Starter', priceM: 29, priceY: 290, features: ['Check-in básico', 'Hasta 3 sedes', 'Soporte estándar'] },
    { name: 'Professional', priceM: 99, priceY: 990, features: ['Todo en Starter', 'Chat en tiempo real', 'Roles avanzados'] },
    { name: 'Enterprise', priceM: 299, priceY: 2990, features: ['SSO/2FA', 'Soporte 24/7', 'Integraciones personalizadas'] },
  ]
  return (
    <section id="pricing" className="relative bg-black text-white py-20">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">Precios</h2>
          <div className="flex items-center gap-2">
            <span className={`text-sm ${!yearly ? 'text-white' : 'text-white/60'}`}>Mensual</span>
            <button onClick={() => setYearly(v => !v)} className="relative w-12 h-6 rounded-full bg-white/10 border border-white/15">
              <span className={`absolute top-0.5 ${yearly ? 'left-6' : 'left-0.5'} w-5 h-5 rounded-full bg-[#0386D9] transition-all`} />
            </button>
            <span className={`text-sm ${yearly ? 'text-white' : 'text-white/60'}`}>Anual</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((t, idx) => (
            <motion.div key={t.name} initial={{ rotateX: -10, opacity: 0 }} whileInView={{ rotateX: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.05, type: 'spring' }} className="backdrop-blur-md bg-white/10 border border-white/15 rounded-2xl p-6 hover:scale-[1.02] transition-transform">
              <div className="text-xl font-semibold">{t.name}</div>
              <div className="mt-2 text-4xl font-extrabold">${yearly ? t.priceY : t.priceM}<span className="text-base font-medium text-white/70">/{yearly ? 'año' : 'mes'}</span></div>
              <ul className="mt-4 space-y-2">
                {t.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-white/85"><Check size={16} className="text-[#34D399]" /> {f}</li>
                ))}
              </ul>
              <button className="mt-6 w-full py-2 rounded-lg bg-[#0386D9] hover:bg-[#0a76b8]">Elegir</button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TechStack() {
  const logos = ['Next.js', 'NestJS', 'PostgreSQL', 'TypeORM', 'Socket.IO']
  return (
    <section className="relative bg-[#020617] text-white py-20">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(90deg, rgba(3,134,217,0.15) 1px, transparent 1px), linear-gradient(0deg, rgba(3,134,217,0.15) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="container mx-auto px-6 relative">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Construido con Tecnología de Punta</h2>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {logos.map((name, i) => (
            <motion.div key={name} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="px-5 py-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition-colors">
              <span className="text-white/90">{name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Integrations() {
  const integrations = ['Slack', 'Google Calendar', 'Microsoft Teams', 'Zoom']
  return (
    <section className="relative bg-black text-white py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Se Integra con tus Herramientas Favoritas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {integrations.map((name, i) => (
            <motion.div key={name} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="rounded-2xl p-6 backdrop-blur-md bg-white/10 border border-white/15 text-center hover:translate-y-[-4px] transition-transform">
              <div className="text-lg font-semibold">{name}</div>
              <div className="mt-2 text-sm text-white/80">Datos fluyendo entre plataformas</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="relative bg-gradient-to-b from-black to-[#021a2b] text-white py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <Spline scene="https://prod.spline.design/4HIlOdlXYYkZW66z/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 pointer-events-none" />
      <div className="relative container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold">¿Listo para Transformar tu Seguridad?</h2>
          <p className="mt-3 text-white/85">Sin tarjeta de crédito • Setup en 5 minutos • Soporte 24/7</p>
          <form className="mt-6 flex flex-col sm:flex-row items-center gap-3 justify-center">
            <input type="email" required placeholder="Tu email corporativo" className="w-full sm:w-80 px-4 py-3 rounded-lg bg-white/10 border border-white/20 outline-none"/>
            <button className="px-6 py-3 rounded-lg font-semibold bg-[#0386D9] hover:bg-[#0a76b8]">Solicitar Demo</button>
          </form>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          <div className="col-span-2">
            <div className="text-xl font-bold">Novack</div>
            <p className="text-white/70 mt-2">Plataforma unificada de seguridad.</p>
          </div>
          <div>
            <div className="font-semibold mb-3">Producto</div>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>Features</li>
              <li>Precios</li>
              <li>Demo</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Empresa</div>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>Sobre Nosotros</li>
              <li>Careers</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Recursos</div>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>Documentación</li>
              <li>API</li>
              <li>Soporte</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Legal</div>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>Privacidad</li>
              <li>Términos</li>
              <li>Seguridad</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-white/70">© 2024 Novack Security Platform. Made with ❤️ in Costa Rica 🇨🇷</div>
          <div className="flex items-center gap-4 text-sm text-white/80">
            <a href="#">LinkedIn</a>
            <a href="#">Twitter</a>
            <a href="#">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white relative">
      <NeonCursor />
      <Hero />
      <Features />
      <DashboardPreview />
      <Security />
      <UseCases />
      <Pricing />
      <TechStack />
      <Integrations />
      <FinalCTA />
      <Footer />
    </div>
  )
}
