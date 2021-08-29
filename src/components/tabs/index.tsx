import * as React from 'react'
import * as S from './styles'

interface TabItem {
  key: string
  label: string
}

export interface TabsProps {
  items: TabItem[]
  defaultActiveKey?: string
  onChange?: (key: string) => void
}

const Tabs: React.FunctionComponent<TabsProps> = ({
  items,
  defaultActiveKey,
  onChange,
}) => {
  const [activeKey, setActiveKey] = React.useState<string>(
    defaultActiveKey ?? items[0].key
  )

  const clickHandler = (key: string) => {
    setActiveKey(key)
    if (onChange) {
      onChange(key)
    }
  }

  return (
    <S.TabsWrapper>
      {items.map((item) => (
        <S.TabItem
          key={item.key}
          isActive={item.key === activeKey}
          onClick={() => clickHandler(item.key)}
        >
          {item.label}
        </S.TabItem>
      ))}
    </S.TabsWrapper>
  )
}

export default Tabs
