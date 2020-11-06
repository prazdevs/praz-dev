import Highlight, { defaultProps } from 'prism-react-renderer'
import lightTheme from 'prism-react-renderer/themes/nightOwlLight'
import darkTheme from 'prism-react-renderer/themes/nightOwl'
import { useColorMode } from '@chakra-ui/core'

export default props => {
  const { colorMode } = useColorMode()
  const className = props.children.props.className || ''
  const title = props.children.props.title || ''
  const matches = className.match(/language-(?<lang>.*)/)

  return (
    <Highlight
      {...defaultProps}
      code={props.children.props.children.trim()}
      language={
        matches && matches.groups && matches.groups.lang
          ? matches.groups.lang
          : ''
      }
      theme={colorMode === 'light' ? lightTheme : darkTheme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{ ...style, padding: '20px', whiteSpace: 'pre-wrap', fontFamily: 'Jetbrains Mono' }}
        >
          <span>{title}</span>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
