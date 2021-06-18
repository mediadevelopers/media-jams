import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  Select,
  useToken,
} from '@chakra-ui/react';
import { Search } from '@components/Icons';

export default function SearchInput() {
  return (
    <InputGroup
      size="lg"
      bg="#FFFFFF"
      borderRadius="8px"
      mt="24px"
      border="1px solid #D3DDE6"
    >
      <InputLeftElement pt={2}>
        <Search />
      </InputLeftElement>
      <Input
        h="56px"
        placeholder="Search by tag, title, keyword, author, etc..."
        _placeholder={{
          fontFamily: 'DM Sans',
          fontSize: '16px',
          lineHeight: '152%',
          color: useToken('colors', 'grey.700'),
        }}
      />
      <InputRightAddon bg="#FFFFFF" h="auto">
        <Select
          fontFamily="DM Sans"
          fontSize="16px"
          lineHeight="152%"
          color="grey.700"
          fontWeight="400"
          defaultValue="All jams"
          borderRadius="0px"
          border="0px"
        >
          <option value="All jams">All Jams</option>
          <option value="Only bookmarked">Only bookmarked</option>
          <option value="Not bookmarked">Not Bookmarked</option>
        </Select>
      </InputRightAddon>
    </InputGroup>
  );
}
