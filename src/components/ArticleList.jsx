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
  Stack
} from '@chakra-ui/core'
import useColors from '../hooks/useColors'
import { Calendar, Watch } from 'emotion-icons/feather'
import { Link as GatsbyLink } from 'gatsby'
import TechTag from './TechTag'
import thumbnail from './article.jpg'

const ArticleList = ({ articles }) => {
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
            <Avatar
              size='md'
              src={thumbnail}
              mr={3}
              // display='none'
              display={{ base: 'none', sm: 'inline-flex' }}
              _groupHover={{ borderColor: primary, borderWidth: '2px' }}
            />
            <Stack direction='column'>
              <Text fontSize='xl'>{article.title}</Text>
              {/* <Wrap>
                {article.tags.map(tag => (
                  <WrapItem key={tag}>
                    <TechTag tech={tag} />
                  </WrapItem>
                ))}
              </Wrap> */}
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
