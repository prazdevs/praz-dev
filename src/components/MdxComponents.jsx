import Highlight, { defaultProps } from 'prism-react-renderer'
import lightTheme from 'prism-react-renderer/themes/nightOwlLight'
import darkTheme from 'prism-react-renderer/themes/nightOwl'
import {
  useColorMode,
  useColorModeValue,
  Heading,
  Text,
  VisuallyHidden,
  css,
  Flex,
  Box
} from '@chakra-ui/core'
import useColors from '../hooks/useColors'

const Pre = props => {
  const theme = useColorModeValue(lightTheme, darkTheme)
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
      theme={theme}
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

const Paragraph = props => <Text {...props} my={3} fontWeight='400' />

const H1 = props => <VisuallyHidden {...props} />
const H2 = props => (
  <Heading
    {...props}
    as='h2'
    fontFamily='Montserrat'
    fontSize='3xl'
    fontWeight='600'
    my='0.75em'
  />
)
const H3 = props => (
  <Heading
    {...props}
    as='h3'
    fontFamily='Montserrat'
    fontSize='2xl'
    fontWeight='500'
    my='0.75em'
  />
)
const H4 = props => (
  <Heading
    {...props}
    as='h4'
    fontFamily='Montserrat'
    fontSize='xl'
    fontWeight='normal'
    my='0.75em'
  />
)
const H5 = props => (
  <Heading
    {...props}
    as='h5'
    fontFamily='Montserrat'
    fontSize='lg'
    fontWeight='normal'
    my='0.75em'
  />
)
const H6 = props => (
  <Heading
    {...props}
    as='h6'
    fontFamily='Montserrat'
    fontSize='md'
    fontWeight='normal'
    my='0.75em'
  />
)

const Blockquote = props => {
  const { body } = useColors()

  return (
    <Flex
      {...props}
      direction='column'
      fontFamily='Marck Script'
      fontSize='2xl'
      mx={10}
      my={2}
      px={2}
    />
  )
}

const Cite = props => <Text {...props} as='cite' alignSelf='flex-end' />

export default {
  pre: Pre,
  p: Paragraph,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  blockquote: Blockquote,
  cite: Cite
}
