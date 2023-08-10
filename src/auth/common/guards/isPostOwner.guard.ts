import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PostService } from 'src/post/post.service';

@Injectable()
export class IsPostOwnerGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly postService: PostService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const postId = request.params.postId;
    const post = await this.postService.findOneById(postId);
    const routePath = request.route.path.toString();
    if (!user || !post) return true;
    if (routePath.includes('/action/thumbup')) return true;
    if (this.validateRoles(user.roles)) return true;
    return this.validatePostOwner(user.id, post.userId._id.toString());
  }

  validatePostOwner(userId: string, postUserId: string) {
    return userId === postUserId;
  }

  validateRoles(roles: string[]) {
    return roles.includes('ADMIN');
  }
}
