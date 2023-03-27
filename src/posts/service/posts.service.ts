import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from 'src/entities/post';
import { CreatePostDto } from '../dtos/createPost.dto';
import { UpdatePostDto } from '../dtos/updatePost.dto';
import { UsersService } from 'src/users/services/users.service';
import { User } from 'src/entities/user';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private repoPost: Repository<Posts>,
    private usersService: UsersService,
  ) {}
  async createPost(body: CreatePostDto, id: number): Promise<any> {
    let post = this.repoPost.create(body);
    let user = await this.usersService.findById(id);
    console.log(user);

    return this.repoPost.save({ ...post, user });
  }
  async findposts(limit, page) {
    limit = Number(limit);
    page = Number(page) || 1;
    let skip1 = (page - 1) * limit;
    if (isNaN(skip1)) {
      (skip1 = undefined), (limit = undefined);
    }
    //pagination
    let post = await this.repoPost.find({
      skip: skip1,
      take: limit,
      order: { id: 'DESC' },
    });
    //pagination   QueryBuilder
    post = await this.repoPost
      .createQueryBuilder()
      .select('*')
      .skip(skip1)
      .take(limit)
      .orderBy('id', 'DESC')
      .getRawMany();

    //leftjoin

    let queryBuilder = this.repoPost
      .createQueryBuilder()
      .select(['user.id', 'posts.title'])
      .leftJoin(User, 'user', 'posts.userId = user.id')
      .getRawMany();

    //InnerJoin
    queryBuilder = this.repoPost
      .createQueryBuilder()
      .innerJoin(User, 'user', 'posts.userId = user.id')
      .select(['user.id', 'posts.title'])
      .getRawMany();

    //GroupBy

    queryBuilder = this.repoPost
      .createQueryBuilder()
      .innerJoin(User, 'user', 'posts.userId = user.id')
      .groupBy('user.id')
      .orderBy('user.id', 'DESC')
      .select(['user.id'])
      .getRawMany();

    //agregation
    queryBuilder = this.repoPost
      .createQueryBuilder()
      .select('SUM(posts.id)', 'SUM')
      .addSelect('AVG(posts.id)', 'AVG')
      .addSelect('MAX(posts.id)', 'MAX')
      .addSelect('MIN(posts.id)', 'MIN')
      .getRawOne();
    if (!post.length) throw new NotFoundException('Not found');
    return queryBuilder;
  }
  async findById(id: number): Promise<Posts> {
    let post = await this.repoPost.findOneBy({ id });
    if (!post) throw new NotFoundException('Not found');

    return this.repoPost.findOneBy({ id });
  }

  async update(id: number, body: UpdatePostDto): Promise<Posts> {
    let post = await this.findById(id);

    Object.assign(post, body);
    return this.repoPost.save(post);
  }
  async delete(id: number): Promise<Posts> {
    let post = await this.findById(id);
    return this.repoPost.remove(post);
  }
}
