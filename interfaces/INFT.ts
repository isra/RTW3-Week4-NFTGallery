export interface ResponseNFT {
  ownedNfts: OwnedNft[];
  pageKey: string;
  totalCount: number;
  blockHash: string;
}

export interface OwnedNft {
  contract: Contract;
  id: Id;
  balance: string;
  title: string;
  description: string;
  tokenUri: TokenUri;
  media: Media[];
  metadata: Metadata;
  timeLastUpdated: string;
  contractMetadata?: ContractMetadata;
  spamInfo?: SpamInfo;
  error?: string;
}

interface SpamInfo {
  isSpam: string;
  classifications: string[];
}

interface ContractMetadata {
  name: string;
  symbol: string;
  tokenType: string;
  totalSupply?: string;
}

interface Metadata {
  name?: string;
  image?: string;
  description?: string;
  external_url?: string;
  dna?: string;
  metadata?: any[];
  attributes?: (Attribute | Attributes2 | Attributes3 | Attributes4)[];
  symbol?: string;
  animation_url?: string;
  image_details?: Imagedetails;
  animation_details?: Animationdetails;
  image_url?: string;
  created_by?: string;
  animation?: string;
  google_image?: string;
  ipfs_image?: string;
  points?: Points;
  background_color?: string;
  tokenID?: string;
  tokenId?: number;
  youtube_url?: string;
  external_link?: string;
  background_image?: string;
  is_normalized?: boolean;
  segment_length?: number;
  name_length?: number;
  version?: number;
  url?: string;
}

interface Points {
  Hats: number;
  Shirt: number;
  Face: number;
  Body: number;
}

interface Animationdetails {
  duration: number;
  sha256: string;
  bytes: number;
  codecs: string[];
  format: string;
  width: number;
  height: number;
}

interface Imagedetails {
  format: string;
  width: number;
  sha256: string;
  bytes: number;
  height: number;
}

interface Attributes4 {
  value: string;
  key: string;
  trait_type: string;
}

interface Attributes3 {
  value: number | string;
  trait_type: string;
}

interface Attributes2 {
  value: string;
  trait_type: string;
}

interface Attribute {
  display_type: string;
  value: number | string;
  trait_type: string;
}

interface Media {
  raw: string;
  gateway: string;
  thumbnail?: string;
  format?: string;
  bytes?: number;
}

interface TokenUri {
  raw: string;
  gateway: string;
}

interface Id {
  tokenId: string;
  tokenMetadata: TokenMetadata;
}

interface TokenMetadata {
  tokenType: string;
}

interface Contract {
  address: string;
}