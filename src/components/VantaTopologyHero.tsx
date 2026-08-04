type VantaTopologyHeroProps = {
  className?: string
}

const nodes = [
  { x: 220, y: 180, r: 1.8 },
  { x: 380, y: 140, r: 1.3 },
  { x: 560, y: 220, r: 1.6 },
  { x: 720, y: 170, r: 1.4 },
  { x: 920, y: 150, r: 1.5 },
  { x: 260, y: 360, r: 1.5 },
  { x: 470, y: 420, r: 1.4 },
  { x: 760, y: 380, r: 1.6 },
  { x: 940, y: 430, r: 1.3 },
  { x: 340, y: 610, r: 1.4 },
  { x: 620, y: 620, r: 1.5 },
  { x: 860, y: 610, r: 1.4 },
  { x: 120, y: 270, r: 1.2 },
  { x: 1040, y: 260, r: 1.2 },
  { x: 510, y: 90, r: 1.2 },
  { x: 660, y: 720, r: 1.2 },
  { x: 180, y: 520, r: 1.2 },
  { x: 840, y: 100, r: 1.2 },
  { x: 1000, y: 620, r: 1.2 },
  { x: 300, y: 70, r: 1.1 },
]

const lines = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [0, 5],
  [5, 6],
  [6, 7],
  [7, 8],
  [5, 9],
  [9, 10],
  [10, 11],
  [6, 10],
  [2, 7],
  [12, 5],
  [13, 8],
  [14, 1],
  [15, 10],
  [12, 14],
  [13, 15],
  [14, 6],
  [15, 7],
  [16, 5],
  [16, 9],
  [17, 2],
  [17, 4],
  [18, 10],
  [18, 11],
  [19, 0],
  [19, 14],
  [16, 18],
  [17, 19],
]

export function VantaTopologyHero({ className = '' }: VantaTopologyHeroProps) {
  return (
    <div className={`vanta-topology absolute inset-0 overflow-hidden ${className}`}>
      <style>{`
        @keyframes topologyFloat {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(3px, -2px, 0) scale(1.003); }
          100% { transform: translate3d(-2px, 2px, 0) scale(1.001); }
        }

        @keyframes topologyPulse {
          0%, 100% { opacity: 0.09; }
          50% { opacity: 0.24; }
        }

        @keyframes neuralGlow {
          0%, 100% { opacity: 0.12; transform: scale(0.985); }
          50% { opacity: 0.28; transform: scale(1.025); }
        }

        @keyframes pulseTrail {
          0% { opacity: 0; transform: scale(0.7); }
          20% { opacity: 0.65; transform: scale(1); }
          60% { opacity: 0.24; transform: scale(1.16); }
          100% { opacity: 0; transform: scale(1.34); }
        }

        @media (max-width: 767px), (prefers-reduced-motion: reduce) {
          .vanta-topology svg, 
          .vanta-topology line, 
          .vanta-topology circle, 
          .vanta-topology g {
            animation: none !important;
          }
          .vanta-topology [filter] {
            filter: none !important;
          }
        }
      `}</style>

      <svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        style={{ animation: 'topologyFloat 16s ease-in-out infinite alternate' }}
      >
        <defs>
          <linearGradient id="topologyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00FF66" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#9cff38" stopOpacity="0.24" />
          </linearGradient>

          <filter id="neuralGlow" x="-90%" y="-90%" width="280%" height="280%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1.2 0"
            />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect x="0" y="0" width="1200" height="800" fill="transparent" />

        <g opacity="0.7" filter="url(#neuralGlow)">
          {lines.map(([from, to], index) => {
            const fromNode = nodes[from]
            const toNode = nodes[to]
            return (
              <line
                key={`glow-${from}-${to}`}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke="#9cff38"
                strokeWidth="8"
                strokeLinecap="round"
                style={{ animation: `neuralGlow ${6 + (index % 4) * 1.6}s ease-in-out infinite` }}
              />
            )
          })}
        </g>

        {lines.map(([from, to], index) => {
          const fromNode = nodes[from]
          const toNode = nodes[to]
          return (
            <g key={`${from}-${to}`}>
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke="#9cff38"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity="0.18"
                style={{ animation: `pulseTrail ${6 + (index % 4) * 1.5}s ease-in-out infinite` }}
              />
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke="url(#topologyGradient)"
                strokeWidth="0.95"
                strokeLinecap="round"
                opacity="0.3"
                style={{ animation: `topologyPulse ${6 + (index % 4) * 1.6}s ease-in-out infinite` }}
              />
            </g>
          )
        })}

        {nodes.map((node, index) => (
          <g key={`node-${node.x}-${node.y}`}>
            <circle
              cx={node.x}
              cy={node.y}
              r={node.r + 5.8}
              fill="#8DFF00"
              opacity="0.14"
              filter="url(#neuralGlow)"
              style={{ animation: `neuralGlow ${5 + (index % 5) * 1.1}s ease-in-out infinite` }}
            />
            <circle
              cx={node.x}
              cy={node.y}
              r={node.r}
              fill="#00FF66"
              opacity="0.7"
              style={{ animation: `topologyPulse ${5 + (index % 5) * 1.1}s ease-in-out infinite` }}
            />
          </g>
        ))}
      </svg>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,102,0.08),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(108,214,0,0.09),transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,9,0.02),rgba(9,9,9,0.78))]" />
    </div>
  )
}
