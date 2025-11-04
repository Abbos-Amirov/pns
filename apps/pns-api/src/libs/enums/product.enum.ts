import { registerEnumType } from '@nestjs/graphql';

/ === PRODUCT TYPE === /
export enum ProductType {
  DOOR = 'DOOR',          // Eshik
  WINDOW = 'WINDOW',      // Deraza
}
registerEnumType(ProductType, { name: 'ProductType' });

/ === PRODUCT MATERIAL === /
export enum ProductMaterial {
  ALUMINUM = 'ALUMINUM',  // Alyuminiy material
  PVC = 'PVC',            // Plastik (PVC) material
  WOOD = 'WOOD',          // Yog‘och material
  STEEL = 'STEEL',        // Po‘lat (metall) material
  GLASS = 'GLASS',        // Shisha material (faqat oynaviy qism uchun)
}
registerEnumType(ProductMaterial, { name: 'ProductMaterial' });

/** === PRODUCT COLOR === **/
export enum ProductColor {
  WHITE = 'WHITE',        // Oq rang
  BLACK = 'BLACK',        // Qora rang
  GRAY = 'GRAY',          // Kulrang
  BROWN = 'BROWN',        // Jigarrang
  SILVER = 'SILVER',      // Kumushrang (metallik)
  BRONZE = 'BRONZE',      // Bronza (mis rangli)
}
registerEnumType(ProductColor, { name: 'ProductColor' });

/** === PRODUCT GLASS TYPE === */
export enum ProductGlassType {
  SINGLE = 'SINGLE',      // Yagona qatlamli shisha
  DOUBLE = 'DOUBLE',      // Ikkitalik (2 qatlamli) shisha
  TRIPLE = 'TRIPLE',      // Uch qatlamli shisha
  TEMPERED = 'TEMPERED',  // Mustahkamlangan (temperli) shisha
  LOW_E = 'LOW_E',        // Energiya tejovchi (Low-E) shisha turi
}
registerEnumType(ProductGlassType, { name: 'ProductGlassType' });

/** === PRODUCT OPEN TYPE === */
export enum ProductOpenType {
  SLIDING = 'SLIDING',    // Sürmeli — suriladigan eshik/deraza
  SWING = 'SWING',        // Ochiladigan (kapotli) eshik/deraza
  FIXED = 'FIXED',        // Qimirlamaydigan, o‘rnatilgan (masalan, vitrina)
  FOLDING = 'FOLDING',    // Bukiladigan (akordeon tipidagi)
}
registerEnumType(ProductOpenType, { name: 'ProductOpenType' });

/** === PRODUCT STATUS === **/
export enum ProductStatus {
  AVAILABLE = 'AVAILABLE',        // Sotuvda bor
  OUT_OF_STOCK = 'OUT_OF_STOCK',  // Tugagan, mavjud emas
  DISCONTINUED = 'DISCONTINUED',  // Ishlab chiqarish to‘xtatilgan
  CUSTOM_ORDER = 'CUSTOM_ORDER',  // Buyurtma asosida tayyorlanadi
}
registerEnumType(ProductStatus, { name: 'ProductStatus' });

/** === PRODUCT CATEGORY === **/
export enum ProductCategory {
  INTERIOR = 'INTERIOR',  // Ichki (xonaning ichki qismi uchun)
  EXTERIOR = 'EXTERIOR',  // Tashqi (binoning tashqi qismi uchun)
  BALCONY = 'BALCONY',    // Balkon yoki veranda uchun
  OFFICE = 'OFFICE',      // Ofis yoki tijoriy joylar uchun
}
registerEnumType(ProductCategory, { name: 'ProductCategory' });

export enum ProductLocation {
  SEOUL = 'SEOUL',
  BUSAN = 'BUSAN',
  INCHEON = 'INCHEON',
  DAEGU = 'DAEGU',
  DAEJEON = 'DAEJEON',
  GWANGJU = 'GWANGJU',
  ULSAN = 'ULSAN',
  SUWON = 'SUWON',
  CHEONAN = 'CHEONAN',
  JEJU = 'JEJU',
  OTHER = 'OTHER', // boshqa joylar uchun
}

// GraphQL registratsiya — bu enumni schema.graphql’da ishlatish uchun
registerEnumType(ProductLocation, {
  name: 'ProductLocation',
  description: 'Mahsulot joylashuvi (shahar yoki region)',
});