import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../decorator';
import { JwtGuard } from '../guard';
import { BookmarkService } from './bookmark.service';
import {
  CreateBookmarksDto,
  EditBookmarksDto,
} from './dto';

@Controller('bookmarks')
@UseGuards(JwtGuard)
export class BookmarkController {
  constructor(
    private bookmarksService: BookmarkService,
  ) {}

  @Post()
  addingBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarksDto,
  ) {
    return this.bookmarksService.createBookmark(
      userId,
      dto,
    );
  }

  @Get()
  getBookmarks(@GetUser('id') userId: number) {
    return this.bookmarksService.getBookmarks(
      userId,
    );
  }

  @Get(':id')
  getBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarksService.getBookmarkById(
      userId,
      bookmarkId,
    );
  }

  @Patch(':id')
  editBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: EditBookmarksDto,
  ) {
    return this.bookmarksService.editBookmarkById(
      userId,
      bookmarkId,
      dto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarksService.deleteBookmarkById(
      userId,
      bookmarkId,
    );
  }
}
