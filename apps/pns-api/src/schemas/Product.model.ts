import { Schema } from 'mongoose';
import {
  ProductType,
  ProductMaterial,
  ProductColor,
  ProductGlassType,
  ProductOpenType,
  ProductStatus,
  ProductCategory,
} from '../libs/enums/product.enum';

const ProductSchema = new Schema(
  {
    // === MAHSULOT TURI === /
    productType: {
      type: String,
      enum: ProductType, // DOOR / WINDOW
      required: true,
    },

    /* === MATERIAL TURINI KORSATADI === */
    productMaterial: {
      type: String,
      enum: ProductMaterial, // ALUMINUM / PVC / WOOD / STEEL / GLASS
      required: true,
    },

    /*  === RANG === */
    productColor: {
      type: String,
      enum: ProductColor, // WHITE / BLACK / GRAY ...
      required: true,
    },

    // === SHISHA TURINI KO‘RSATADI === /
    productGlassType: {
      type: String,
      enum: ProductGlassType, // DOUBLE / TRIPLE / TEMPERED ...
      required: false,
    },

    // === OCHILISH MEXANIZMI (SLIDING, SWING, ...) === /
    productOpenType: {
      type: String,
      enum: ProductOpenType,
      required: false,
    },

    // === MAHSULOT KATEGORIYASI === /
    productCategory: {
      type: String,
      enum: ProductCategory, // INTERIOR / EXTERIOR / BALCONY / OFFICE
      required: false,
    },

    // === STATUS === /
    productStatus: {
      type: String,
      enum: ProductStatus,
      default: ProductStatus.AVAILABLE, // AVAILABLE by default
    },

    // === MAHSULOT NOMI === /
    productTitle: {
      type: String,
      required: true, // Masalan: "Aluminum Sliding Door 1200x2100"
    },

    // === TAVSIF (IZOH) === /
    productDesc: {
      type: String,
    },

    // === NARX === /
    productPrice: {
      type: Number,
      required: true,
    },

    // === O‘LCHAM (width x height) === /
    productWidth: {
      type: Number,
      required: true,
    },
    productHeight: {
      type: Number,
      required: true,
    },

    // === SHUNGA OXSHASH STATISTIKA FIELDS === /
    productViews: {
      type: Number,
      default: 0,
    },
    productLikes: {
      type: Number,
      default: 0,
    },
    productComments: {
      type: Number,
      default: 0,
    },
    productRank: {
      type: Number,
      default: 0,
    },

    // === RASMLAR === /
    productImages: {
      type: [String],
      required: true,
    },

    // === BUYURTMA BILAN BOG‘LIQ BOOLEANLAR === /
    productCustomOrder: {
      type: Boolean,
      default: false, // maxsus buyurtma asosida tayyorlanadimi yo‘qmi
    },

    // === ALOQADOR MEMBER === /
    memberId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Member', // ishlab chiqargan yoki o‘lchov olgan a’zoni bildiradi
    },

    // === SANALAR === /
    soldAt: {
      type: Date, // sotilgan vaqt
    },
    deletedAt: {
      type: Date,
    },
    manufacturedAt: {
      type: Date, // ishlab chiqarilgan sana
    },
  },
  {
    timestamps: true,
    collection: 'products',
  },
);

// === INDEXLAR === /
ProductSchema.index(
  {
    productType: 1,
    productMaterial: 1,
    productColor: 1,
    productTitle: 1,
    productPrice: 1,
  },
  { unique: false },
);

export default ProductSchema;