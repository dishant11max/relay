'use client'

type CellValue = boolean | string

interface Row {
  feature: string
  free: CellValue
  pro: CellValue
}

interface Group {
  label: string
  rows: Row[]
}

const GROUPS: Group[] = [
  {
    label: 'RESUME',
    rows: [
      { feature: 'ATS Score',              free: 'Once/month', pro: 'Unlimited'  },
      { feature: 'JD keyword targeting',   free: false,        pro: true          },
      { feature: 'LaTeX resume export',    free: '1/month',    pro: 'Unlimited'  },
      { feature: 'PDF resume export',      free: false,        pro: true          },
      { feature: 'Resume version history', free: false,        pro: 'Last 10'    },
      { feature: 'AI summary generation',  free: true,         pro: true          },
    ],
  },
  {
    label: 'PORTFOLIO',
    rows: [
      { feature: 'Portfolio page',     free: 'Basic',  pro: 'Minimalist' },
      { feature: 'Custom domain',      free: false,    pro: true          },
      { feature: 'Auto-sync on push',  free: false,    pro: true          },
      { feature: 'Thread generator',   free: false,    pro: true          },
    ],
  },
  {
    label: 'INTEGRATIONS',
    rows: [
      { feature: 'GitHub OAuth',        free: true,  pro: true },
      { feature: 'Private repo access', free: false, pro: true },
      { feature: 'Webhook auto-sync',   free: false, pro: true },
    ],
  },
  {
    label: 'SUPPORT',
    rows: [
      { feature: 'Community support', free: true,  pro: true },
      { feature: 'Priority support',  free: false, pro: true },
    ],
  },
]

function Cell({ value, isProCol = false }: { value: CellValue; isProCol?: boolean }) {
  if (value === true) {
    return (
      <td style={{ padding: '10px 16px', textAlign: 'center' }}>
        <div
          style={{
            width: 16,
            height: 16,
            background: '#4afe80',
            margin: '0 auto',
          }}
        />
      </td>
    )
  }
  if (value === false) {
    return (
      <td style={{ padding: '10px 16px', textAlign: 'center' }}>
        <div
          style={{
            width: 16,
            height: 16,
            background: '#1a1a1a',
            margin: '0 auto',
          }}
        />
      </td>
    )
  }
  return (
    <td
      className="font-mono"
      style={{
        padding: '10px 16px',
        textAlign: 'center',
        fontSize: 14,
        color: isProCol ? '#4afe80' : '#a3a3a3',
      }}
    >
      {value}
    </td>
  )
}

export default function FeatureTable() {
  return (
    <div style={{ padding: '0 36px 80px' }}>
      {/* Section header */}
      <p
        className="font-mono tracking-[0.18em] text-accent"
        style={{ fontSize: 13, textAlign: 'center', marginBottom: 12 }}
      >
        FULL COMPARISON
      </p>
      <h2
        className="font-display font-extrabold text-body"
        style={{
          fontSize: 36,
          letterSpacing: '-0.025em',
          textAlign: 'center',
          marginBottom: 40,
        }}
      >
        Everything, side by side.
      </h2>

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
        }}
      >
        {/* Table header */}
        <thead>
          <tr style={{ background: '#0c0c0c', borderBottom: '1px solid #1e1e1e' }}>
            <th
              className="font-mono"
              style={{
                fontSize: 13,
                color: '#a3a3a3',
                letterSpacing: '0.1em',
                textAlign: 'left',
                padding: '12px 16px',
                fontWeight: 700,
              }}
            >
              FEATURE
            </th>
            <th
              className="font-mono"
              style={{
                fontSize: 13,
                color: '#a3a3a3',
                letterSpacing: '0.1em',
                textAlign: 'center',
                padding: '12px 16px',
                fontWeight: 700,
              }}
            >
              FREE
            </th>
            <th
              className="font-mono text-accent"
              style={{
                fontSize: 13,
                letterSpacing: '0.1em',
                textAlign: 'center',
                padding: '12px 16px',
                fontWeight: 700,
              }}
            >
              PRO
            </th>
          </tr>
        </thead>

        {GROUPS.map((group) => (
          <tbody key={group.label}>
            {/* Group header */}
            <tr style={{ borderTop: '1px solid #1a1a1a' }}>
              <td
                colSpan={3}
                className="font-mono"
                style={{
                  fontSize: 12,
                  color: '#737373',
                  letterSpacing: '0.14em',
                  padding: '10px 16px 4px',
                }}
              >
                {group.label}
              </td>
            </tr>
            {/* Data rows */}
            {group.rows.map((row, ri) => (
              <tr
                key={row.feature}
                style={{ borderBottom: '1px solid #0f0f0f', transition: 'background 150ms' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.01)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <td
                  className="font-mono text-body"
                  style={{ fontSize: 15, padding: '10px 16px', color: '#e8e8e8' }}
                >
                  {row.feature}
                </td>
                <Cell value={row.free} />
                <Cell value={row.pro} isProCol />
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  )
}
