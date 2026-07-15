import { tools } from '../../data/content'
import {
  Crosshair,
  ChartArea,
  Fan,
  Battery,
  RotateCw,
  ArrowRight,
} from 'lucide-react'
import Button from '../ui/Button/Button'
import styles from './ToolsPanel.module.css'

const iconMap = {
  crosshair: Crosshair,
  chartArea: ChartArea,
  fan: Fan,
  battery: Battery,
  rotateCw: RotateCw,
}

export default function ToolsPanel() {
  return (
    <aside className={styles.panel}>
      <div className={styles.header}>
        <h3 className={styles.title}>TOOLS</h3>
        <p className={styles.subtitle}>Quick engineering calculators</p>
      </div>
      <ul className={styles.list}>
        {tools.map((tool) => {
          const Icon = iconMap[tool.icon] || Crosshair
          return (
            <li key={tool.name} className={styles.item}>
              <a href="#" className={styles.itemLink}>
                <span className={styles.itemIcon}>
                  <Icon size={18} strokeWidth={1.8} />
                </span>
                <span className={styles.itemName}>{tool.name}</span>
                <ArrowRight size={14} strokeWidth={2} className={styles.itemArrow} />
              </a>
            </li>
          )
        })}
      </ul>
      <Button variant="outline" href="#">
        View All Tools
      </Button>
    </aside>
  )
}
