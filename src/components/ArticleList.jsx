import {
  HStack,
  Icon,
  Link,
  Stack,
  StackDivider,
  Text,
  Wrap,
  WrapItem,
  Heading
} from '@chakra-ui/core'
import { Calendar, Watch } from 'emotion-icons/feather'
import { Link as GatsbyLink } from 'gatsby'

import useColors from '../hooks/useColors'
import TechTag from './TechTag'

const ArticleList = ({ articles, isCondensed }) => {
  const { primary, body } = useColors()

  return (
    <Stack direction='column' divider={<StackDivider />}>
      {articles.map(article => (
        <Stack key={article.title} direction='column'>
          <Heading
            as={isCondensed ? 'h3' : 'h2'}
            fontSize='xl'
            fontFamily='Montserrat'
            fontWeight='normal'
          >
            <Link
              as={GatsbyLink}
              to={article.link}
              borderBottomWidth='1px'
              borderBottomColor={body}
              transition='all 0.15s ease'
              _hover={{ color: primary, borderBottomColor: primary, pb: 1 }}
            >
              {article.title}
            </Link>
          </Heading>

          <HStack>
            <Icon as={Calendar} boxSize={5} />
            <Text mr={2}>{article.date}</Text>
            <Icon as={Watch} boxSize={5} />
            <Text>{article.readingTime}</Text>
          </HStack>
          {isCondensed ? null : (
            <Wrap mb={3}>
              {article.tags.map(tag => (
                <WrapItem key={tag}>
                  <TechTag tech={tag} />
                </WrapItem>
              ))}
            </Wrap>
          )}
        </Stack>
      ))}
    </Stack>
  )
}
export default ArticleList
