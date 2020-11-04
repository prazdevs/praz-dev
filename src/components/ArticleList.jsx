import {
  List,
  HStack,
  StackDivider,
  ListItem,
  Avatar,
  Text,
  Wrap,
  Icon,
  Flex,
  WrapItem,
  Stack,
  Image
} from '@chakra-ui/core'
import useColors from '../hooks/useColors'
import { Calendar, Watch } from 'emotion-icons/feather'
import { Link as GatsbyLink } from 'gatsby'
import TechTag from './TechTag'
import thumbnail from './article.jpg'

const ArticleList = ({ articles, isCondensed }) => {
  const { primary } = useColors()

  return (
    <Stack as={List} direction='column' divider={<StackDivider />}>
      {articles.map(article => (
        <ListItem key={article.title}>
          <Flex
            as={GatsbyLink}
            to={article.link}
            direction='row'
            align='center'
            role='group'
            _hover={{ color: primary }}
            transition='all 0.15s ease-out'
          >
            <Image
              boxSize={isCondensed ? '3rem' : '5rem'}
              src={thumbnail}
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
            <Stack direction='column'>
              <Text fontSize='xl'>{article.title}</Text>
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
          </Flex>
        </ListItem>
      ))}
    </Stack>
  )
}
export default ArticleList
