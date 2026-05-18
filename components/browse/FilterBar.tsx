'use client'

const STACK_FILTERS = ['All', 'React', 'Next.js', 'Vue', 'Node.js', 'Python', 'Go', 'Rust']
const SORT_OPTIONS = [
  { value: 'latest',  label: 'Latest'      },
  { value: 'ats',     label: 'Highest ATS' },
  { value: 'repos',   label: 'Most repos'  },
]

interface FilterBarProps {
  search: string
  setSearch: (v: string) => void
  activeStack: string
  setActiveStack: (v: string) => void
  sortBy: string
  setSortBy: (v: string) => void
}

export default function FilterBar({
  search,
  setSearch,
  activeStack,
  setActiveStack,
  sortBy,
  setSortBy,
}: FilterBarProps) {
  return (
    <div
      style={{
        position: 'sticky',
        top: 52,
        zIndex: 40,
        background: 'rgba(8,8,8,0.95)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        borderBottom: '1px solid #1a1a1a',
        padding: '12px var(--page-px)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        flexWrap: 'wrap',
      }}
    >
      {/* Search input */}
      <div style={{ position: 'relative', flex: '0 0 auto', maxWidth: 320, width: '100%' }}>
        <span
          className="font-mono"
          style={{
            position: 'absolute',
            left: 10,
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#737373',
            fontSize: 17,
            pointerEvents: 'none',
          }}
        >
          ⌕
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or @username..."
          className="font-mono text-body"
          style={{
            width: '100%',
            height: 36,
            padding: '0 12px 0 30px',
            background: '#0c0c0c',
            border: '1px solid #1e1e1e',
            fontSize: 14,
            outline: 'none',
            transition: 'border-color 150ms',
            color: '#e8e8e8',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#4afe80')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#1e1e1e')}
        />
      </div>

      {/* Stack filter pills */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
        {STACK_FILTERS.map((s) => (
          <button
            key={s}
            onClick={() => setActiveStack(s)}
            className="font-mono font-bold"
            style={{
              fontSize: 12,
              padding: '4px 12px',
              letterSpacing: '0.06em',
              cursor: 'pointer',
              border: s === activeStack ? 'none' : '1px solid #1e1e1e',
              background: s === activeStack ? '#4afe80' : '#0c0c0c',
              color: s === activeStack ? '#000' : '#a3a3a3',
              transition: 'border-color 150ms',
            }}
            onMouseEnter={(e) => {
              if (s !== activeStack) e.currentTarget.style.borderColor = '#737373'
            }}
            onMouseLeave={(e) => {
              if (s !== activeStack) e.currentTarget.style.borderColor = '#1e1e1e'
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Sort dropdown */}
      <div style={{ marginLeft: 'auto' }}>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="font-mono text-muted-2"
          style={{
            background: '#0c0c0c',
            border: '1px solid #1e1e1e',
            height: 36,
            padding: '0 12px',
            fontSize: 13,
            outline: 'none',
            cursor: 'pointer',
            color: '#a3a3a3',
          }}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value} style={{ background: '#0c0c0c' }}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
