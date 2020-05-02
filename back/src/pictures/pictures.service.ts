import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Picture } from '../pictures/pictures.entity';

@Injectable()
export class PictureService {
  constructor(
    @InjectRepository(Picture)
    private pictureRepository: Repository<Picture>,
  ) {}

  saveImages({ picturesURLs, productId }) {
    const pictures: Picture[] = [];
    for (const url of picturesURLs) {
      const picture = new Picture();
      picture.url = url;
      picture.product = productId;
      pictures.push(picture);
    }

    return this.pictureRepository.insert(pictures);
  }
}
