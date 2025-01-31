// storageService.ts

class StorageService<ItemType extends { id: string; text: string }> {
  constructor(private storage: Storage, private key: string) {}

  private getParseData(): ItemType[] {
    const data = this.storage.getItem(this.key);
    if (!data) {
      return [];
    }

    const dataJson = JSON.parse(data) as ItemType[];
    return dataJson;
  }

  getItem(id: string): ItemType | null {
    const dataJson = this.getParseData();
    const item = dataJson.find((item) => item.id === id) || null;

    return item;
  }

  getItems(): ItemType[] {
    const dataJson = this.getParseData();
    return dataJson;
  }

  setItem(item: ItemType) {
    const dataJson = this.getParseData();
    dataJson.push(item);
    this.storage.setItem(this.key, JSON.stringify(dataJson));
  }

  deleteItem(id: string): void {
    let dataJson = this.getParseData();
    dataJson = dataJson.filter((item) => item.id !== id);
    this.storage.setItem(this.key, JSON.stringify(dataJson));
  }

  changeItem(id: string, text: string, updated: string): void {
    let dataJson = this.getParseData();
    dataJson = dataJson.map((item) => {
      if (item.id === id) {
        return { ...item, text, updated };
      }
      return item;
    });
    this.storage.setItem(this.key, JSON.stringify(dataJson));
  }
}

export default StorageService;
