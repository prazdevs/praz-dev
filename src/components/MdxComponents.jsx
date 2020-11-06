import Highlight, { defaultProps } from 'prism-react-renderer'
import lightTheme from 'prism-react-renderer/themes/nightOwlLight'
import darkTheme from 'prism-react-renderer/themes/nightOwl'
import { useColorMode, Heading, Text, VisuallyHidden } from '@chakra-ui/core'

const Pre = props => {
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
          style={{
            ...style,
            padding: '20px',
            whiteSpace: 'pre-wrap',
            fontFamily: 'Jetbrains Mono'
          }}
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

const Paragraph = props => <Text {...props} my={3} />

const H1 = props => <VisuallyHidden {...props} />
const H2 = props => (
  <Heading
    {...props}
    as='h2'
    fontFamily='Montserrat'
    fontWeight='normal'
    fontSize='3xl'
  />
)
const H3 = props => (
  <Heading
    {...props}
    as='h3'
    fontFamily='Montserrat'
    fontWeight='normal'
    fontSize='2xl'
  />
)
const H4 = props => (
  <Heading
    {...props}
    as='h4'
    fontFamily='Montserrat'
    fontWeight='normal'
    fontSize='xl'
  />
)
const H5 = props => (
  <Heading
    {...props}
    as='h5'
    fontFamily='Montserrat'
    fontWeight='normal'
    fontSize='lg'
  />
)
const H6 = props => (
  <Heading
    {...props}
    as='h6'
    fontFamily='Montserrat'
    fontWeight='normal'
    fontSize='md'
  />
)

export default {
  pre: Pre,
  p: Paragraph,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6
}
