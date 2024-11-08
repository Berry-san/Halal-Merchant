interface SummaryCardProps {
  title: string
  value: string | number
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value }) => {
  return (
    <div className="h-32 px-5 pt-8 font-mono border border-border_color rounded-xl bg-secondary">
      <div className="flex items-center justify-between">
        <div className="font-semibold text-white">
          <div className="text-2xl font-semibold">{value}</div>
          <div className="text-sm">{title}</div>
        </div>
      </div>
    </div>
  )
}

export default SummaryCard
