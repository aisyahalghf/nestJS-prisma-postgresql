import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import {
  CreateBookmarksDto,
  EditBookmarksDto,
} from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  async createBookmark(
    userId: number,
    dto: CreateBookmarksDto,
  ) {
    // validasi  user id
    const user =
      await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

    if (!user)
      throw new ForbiddenException(
        'unauthorization',
      );

    // adding bookmarks
    const newBookmark =
      await this.prisma.bookmark.create({
        data: {
          userId,
          ...dto,
        },
      });

    // return response to client
    return newBookmark;
  }
  async getBookmarks(userId: number) {
    const bookmarks =
      await this.prisma.bookmark.findMany({
        where: {
          userId,
        },
      });
    return bookmarks;
  }

  async getBookmarkById(
    userId: number,
    bookmarkId: number,
  ) {
    const bookmarkSelected =
      this.prisma.bookmark.findUnique({
        where: {
          id: bookmarkId,
          userId: userId,
        },
      });

    return bookmarkSelected;
  }
  async editBookmarkById(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarksDto,
  ) {
    //get the own bookmarks by id
    const bookmark =
      await this.prisma.bookmark.findUnique({
        where: {
          id: bookmarkId,
        },
      });

    //check if user own the bookmarks
    if (!bookmark || bookmark.userId !== userId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    // do edit data
    const editData =
      await this.prisma.bookmark.update({
        where: {
          id: bookmarkId,
        },
        data: { ...dto },
      });

    return editData;
  }

  async deleteBookmarkById(
    userId: number,
    bookmarkId: number,
  ) {
    //get the own bookmarks by id
    const bookmark =
      await this.prisma.bookmark.findUnique({
        where: {
          id: bookmarkId,
        },
      });

    //check if user own the bookmarks
    if (!bookmark || bookmark.userId !== userId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    //delete bookmark
    await this.prisma.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    });
  }
}
