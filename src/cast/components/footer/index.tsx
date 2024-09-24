import FooterContainer from './container'
import FooterHeader from './header'
import FooterActions from './actions'

export default function Footer() {
  return (
    <FooterContainer className="justify-between">
      <FooterHeader />
      <FooterActions />
    </FooterContainer>
  )
}
