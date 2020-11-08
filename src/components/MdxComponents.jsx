import Highlight, { defaultProps } from 'prism-react-renderer'
import lightTheme from 'prism-react-renderer/themes/nightOwlLight'
import darkTheme from 'prism-react-renderer/themes/nightOwl'
import {
  useColorModeValue,
  Heading,
  Text,
  VisuallyHidden,
  Flex,
  List,
  ListItem,
  OrderedList,
  Code,
  Link,
  Image
} from '@chakra-ui/core'
import useColors from '../hooks/useColors'
import { Link as GatsbyLink } from 'gatsby'

const Pre = props => {
  const theme = useColorModeValue(lightTheme, darkTheme)
  const border = useColorModeValue('2px', '0px')
  const titleBg = useColorModeValue('gray.200', 'gray.700')
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
            padding: '1.5rem',
            whiteSpace: 'pre-wrap',
            fontFamily: 'Jetbrains Mono',
            marginTop: '0.75rem',
            marginBottom: '0.75rem',
            borderRadius: '20px',
            borderWidth: border
          }}
        >
          <Text
            mx={2}
            mt='-1.5rem'
            width='fit-content'
            mb='1.5rem'
            backgroundColor={titleBg}
            maxW='fill-available'
            px={2}
            borderBottomRadius={5}
          >
            {title}
          </Text>
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

const Blockquote = props => (
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

const Cite = props => <Text {...props} as='cite' alignSelf='flex-end' my={2} />

const Ul = props => <List {...props} listStyleType='circle' pl={7} my={2} />

const Ol = props => <OrderedList {...props} pl={7} my={2} />

const Li = props => <ListItem {...props} my={1} />

const InlineCode = props => <Code {...props} />

const A = props => {
  const { body, primary } = useColors()
  return (
    <Link
      {...props}
      borderBottomWidth='1px'
      borderBottomColor={body}
      transition='all 0.15s ease'
      fontWeight='500'
      _hover={{ color: primary, borderBottomColor: primary, pb: 1 }}
    />
  )
}

const Img = props => {
  return <Image {...props} />
}

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
  cite: Cite,
  ul: Ul,
  ol: Ol,
  li: Li,
  inlineCode: InlineCode,
  a: A
  // img: Img
}
