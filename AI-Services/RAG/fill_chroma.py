from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
import chromadb

# Sample JSON data
data = [
    {
        "_id": "64c9b3e2a7f1d3a2b4c5d6e7",
        "title": "Candi Borobudur",
        "content": "Candi Borobudur adalah candi Buddha terbesar di dunia yang terletak di Magelang, Jawa Tengah, Indonesia. Candi ini merupakan situs warisan dunia UNESCO dan menjadi salah satu daya tarik wisata paling populer di Asia Tenggara. Dibangun pada abad ke-8 hingga ke-9 oleh Dinasti Syailendra, candi ini memiliki arsitektur mandala yang megah dan kaya akan relief yang menggambarkan kehidupan Buddha dan kisah-kisah Jataka.",
        "author": "John Doe",
        "createdAt": "2025-08-02T10:00:00Z",
        "__v": 0
    },
    {
        "_id": "64c9b4a9a7f1d3a2b4c5d6e8",
        "title": "Monas",
        "content": "Monumen Nasional yang disingkat dengan Monas atau Tugu Monas adalah monumen peringatan setinggi 132 meter, terletak tepat di tengah Lapangan Medan Merdeka, Jakarta Pusat. Monas didirikan untuk mengenang perlawanan dan perjuangan rakyat Indonesia dalam merebut kemerdekaan dari pemerintahan kolonial Kerajaan Belanda.",
        "author": "Jane Smith",
        "createdAt": "2025-08-01T15:30:00Z",
        "__v": 0
    }
]

# Create Document objects from JSON
raw_documents = [
    Document(
        page_content=item["content"],
        metadata={
            "title": item["title"],
            "author": item["author"],
            "createdAt": item["createdAt"],
            "source_id": item["_id"]
        }
    )
    for item in data
]

# Split the documents
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=300,
    chunk_overlap=100,
    length_function=len,
    is_separator_regex=False,
)

chunks = text_splitter.split_documents(raw_documents)

# Prepare to upload to ChromaDB
documents = []
metadata = []
ids = []

for i, chunk in enumerate(chunks):
    documents.append(chunk.page_content)
    ids.append(f"ID{i}")
    metadata.append(chunk.metadata)

# Initialize ChromaDB
CHROMA_PATH = "chroma_db"
chroma_client = chromadb.PersistentClient(path=CHROMA_PATH)
collection = chroma_client.get_or_create_collection(name="indonesian_culture")

# Add to ChromaDB
collection.upsert(
    documents=documents,
    metadatas=metadata,
    ids=ids
)
