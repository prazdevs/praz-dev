import {
  HStack,
  Icon,
  Image,
  Link,
  List,
  ListItem,
  Stack,
  StackDivider,
  Text,
  Wrap,
  WrapItem
} from '@chakra-ui/core'
import { Calendar, Watch } from 'emotion-icons/feather'
import { Link as GatsbyLink } from 'gatsby'

import useColors from '../hooks/useColors'
import TechTag from './TechTag'

const ArticleList = ({ articles, isCondensed }) => {
  const { primary } = useColors()

  return (
    <Stack as={List} direction='column' divider={<StackDivider />}>
      {articles.map((article, idx) => (
        <ListItem key={article.title}>
          <Link
            as={GatsbyLink}
            to={article.link}
            display='flex'
            direction='row'
            alignItems='center'
            role='group'
            aria-labelledby={`article-${idx}`}
            _hover={{ color: primary }}
            transition='all 0.15s ease-out'
          >
            {article.thumbnail ? (
              <Image
                boxSize={isCondensed ? '3rem' : '5rem'}
                src={article.thumbnail}
                mr={3}
                borderRadius='full'
                background='gray.400'
                display={{ base: 'none', sm: 'inline-flex' }}
                _groupHover={{
                  borderColor: primary,
                  borderWidth: '2px',
                  borderStyle: 'solid'
                }}
              />
            ) : null}
            <Stack direction='column'>
              <Text fontSize='xl' id={`article-${idx}`}>
                {article.title}
              </Text>
              {isCondensed ? null : (
                <Wrap>
                  {article.tags.map(tag => (
                    <WrapItem key={tag}>
                      <TechTag tech={tag} />
                    </WrapItem>
                  ))}
                </Wrap>
              )}
              <HStack>
                <Icon as={Calendar} boxSize={5} />
                <Text mr={2}>{article.date}</Text>
                <Icon as={Watch} boxSize={5} />
                <Text>{article.readingTime}</Text>
              </HStack>
            </Stack>
          </Link>
        </ListItem>
      ))}
    </Stack>
  )
}
export default ArticleList
