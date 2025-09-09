import sc from 'styled-components'

interface ScreenReaderOnlyProps {
  id?: string
  children: React.ReactNode
}

export function ScreenReaderOnly({ id, children }: ScreenReaderOnlyProps) {
  return <StyledDiv id={id}>{children}</StyledDiv>
}

const StyledDiv = sc.div`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`
