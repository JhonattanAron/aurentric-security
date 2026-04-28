import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Aurentric Security - Sistemas de Vigilancia Avanzados'
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
          gap: '40px',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: '#00d4ff',
            textAlign: 'center',
          }}
        >
          Aurentric Security
        </div>
        <div
          style={{
            fontSize: 48,
            color: '#e0e0e0',
            textAlign: 'center',
            maxWidth: '1000px',
          }}
        >
          Sistemas de Vigilancia Inteligente en Quito, Pifó y Tumbaco
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#00d4ff',
            display: 'flex',
            gap: '20px',
            marginTop: '20px',
          }}
        >
          ✓ Cámaras 4K  ✓ Drones  ✓ Control Biométrico
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
