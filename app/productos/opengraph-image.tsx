import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Catálogo de Productos - Aurentric Security'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(135deg, #1a1a1a 0%, #0a2e3a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '60px',
          gap: '30px',
        }}
      >
        <div
          style={{
            fontSize: 68,
            fontWeight: 'bold',
            color: '#00d4ff',
            textAlign: 'center',
          }}
        >
          Catálogo de Productos
        </div>
        <div
          style={{
            fontSize: 42,
            color: '#e0e0e0',
            textAlign: 'center',
          }}
        >
          Cámaras, Drones y Sistemas de Seguridad
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#00d4ff',
          }}
        >
          security.aurentric.com/productos
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
