import { diskStorage } from 'multer';
import * as fs from 'fs';

export const BASE_UPLOAD_FOLDER = './dist/images/';

export const multerConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const userId = req.body.userId;
      if (!fs.existsSync(`${BASE_UPLOAD_FOLDER}${userId}/`)) {
        fs.mkdirSync(`${BASE_UPLOAD_FOLDER}${userId}/`);
      }
      cb(null, `${BASE_UPLOAD_FOLDER}${userId}/`);
    },
    filename: (req, { originalname, mimetype }, cb) => {
      const fileExtension: string = mimetype.match(/(?:\/)(\w+)/)[1];
      cb(null, `${originalname}.${fileExtension}`);
    },
  }),
};

export const QUERY_ADD_WHERE = {
  minPrice: ({ partialQuery, searchParams }) =>
    partialQuery.andWhere('product.price > :minPrice', {
      minPrice: searchParams.minPrice,
    }),

  maxPrice: ({ partialQuery, searchParams }) =>
    partialQuery.andWhere('product.price < :maxPrice', {
      maxPrice: searchParams.maxPrice,
    }),
  maxDistance: ({ partialQuery, searchParams, user }) =>
    partialQuery.andWhere(
      `ROUND(ST_Distance_Sphere(point(${user.lat}, ${user.lng}),coords)/1000)<:maxDistance`,
      {
        maxDistance: searchParams.maxDistance,
      },
    ),
  searchTags: ({ partialQuery, searchParams }) =>
    searchParams.searchTags.map((tag, index) => {
      return partialQuery.andWhere(
        `product.categories like :searchTags${index}`,
        {
          [`searchTags${index}`]: `%${tag}%`,
        },
      );
    }),
  conditionTags: ({ partialQuery, searchParams }) => {
    return partialQuery.andWhere(`product.condition = :conditionTag`, {
      conditionTag: `${searchParams.conditionTags[0]}`,
    });
  },

  name: ({ partialQuery, searchParams }) => {
    partialQuery.andWhere('product.title like :name', {
      name: `%${searchParams.name}%`,
    });
    partialQuery.orWhere('product.description like :name', {
      name: `%${searchParams.name}%`,
    });
  },
};
