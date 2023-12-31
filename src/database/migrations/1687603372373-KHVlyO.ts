import { MigrationInterface, QueryRunner } from "typeorm";

export class KHVlyO1687603372373 implements MigrationInterface {
    name = 'KHVlyO1687603372373'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_refresh_tokens\` (\`id\` varchar(36) NOT NULL, \`value\` varchar(500) NOT NULL, \`expired_at\` datetime NOT NULL COMMENT '令牌过期时间', \`createdAt\` datetime(6) NOT NULL COMMENT '令牌创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`accessTokenId\` varchar(36) NULL, UNIQUE INDEX \`REL_1dfd080c2abf42198691b60ae3\` (\`accessTokenId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`rbac_permission\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL COMMENT '权限名', \`label\` varchar(255) NULL COMMENT '权限别名', \`description\` text NULL COMMENT '权限描述', \`rule\` text NOT NULL COMMENT '具体的权限规则', \`customOrder\` int NOT NULL COMMENT '权限排列字段' DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`rbac_roles\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL COMMENT '角色名', \`label\` varchar(255) NULL COMMENT '角色别名', \`description\` text NULL COMMENT '角色描述', \`systemd\` tinyint NOT NULL COMMENT '是否为系统默认角色：普通用户与超级管理员' DEFAULT 0, \`deletedAt\` datetime(6) NULL COMMENT '删除时间', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`nickname\` varchar(255) NULL COMMENT '姓名', \`username\` varchar(255) NOT NULL COMMENT '用户名', \`password\` varchar(500) NOT NULL COMMENT '密码', \`phone\` varchar(255) NULL COMMENT '手机号', \`email\` varchar(255) NULL COMMENT '邮箱', \`createdAt\` datetime(6) NOT NULL COMMENT '用户创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL COMMENT '用户更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL COMMENT '删除时间', \`actived\` tinyint NOT NULL COMMENT '用户是否激活' DEFAULT 1, \`isCreator\` tinyint NOT NULL COMMENT '是否是超级管理员用户' DEFAULT 0, UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), UNIQUE INDEX \`IDX_a000cca60bcf04454e72769949\` (\`phone\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_access_tokens\` (\`id\` varchar(36) NOT NULL, \`value\` varchar(500) NOT NULL, \`expired_at\` datetime NOT NULL COMMENT '令牌过期时间', \`createdAt\` datetime(6) NOT NULL COMMENT '令牌创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_code\` (\`id\` varchar(36) NOT NULL, \`code\` varchar(255) NOT NULL, \`action\` enum ('login', 'register', 'retrieve_password', 'reset_password', 'bound') NOT NULL COMMENT '验证码行为' DEFAULT 'register', \`type\` enum ('sms', 'email') NOT NULL COMMENT '手机验证码或邮箱验证码' DEFAULT 'sms', \`media\` varchar(255) NOT NULL COMMENT '手机号或邮箱', \`createtAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`content_categories\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL COMMENT '分类名称', \`customOrder\` int NOT NULL COMMENT '分类排序' DEFAULT '0', \`deletedAt\` datetime(6) NULL COMMENT '删除时间', \`mpath\` varchar(255) NULL DEFAULT '', \`parentId\` varchar(36) NULL, FULLTEXT INDEX \`IDX_d6aaf8517ca57297a8c3a44d3d\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`content_comments\` (\`id\` varchar(36) NOT NULL, \`body\` longtext NOT NULL COMMENT '评论内容', \`createdAt\` datetime(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`mpath\` varchar(255) NULL DEFAULT '', \`postId\` varchar(36) NOT NULL, \`authorId\` varchar(36) NOT NULL, \`parentId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`content_posts\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL COMMENT '文章标题', \`body\` longtext NOT NULL COMMENT '文章内容', \`summary\` varchar(255) NULL COMMENT '文章描述', \`keywords\` text NULL COMMENT '关键字', \`type\` enum ('html', 'markdown') NOT NULL COMMENT '文章类型' DEFAULT 'markdown', \`publishedAt\` varchar(255) NULL COMMENT '发布时间', \`customOrder\` int NOT NULL COMMENT '自定义文章排序' DEFAULT '0', \`createdAt\` datetime(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL COMMENT '删除时间', \`authorId\` varchar(36) NOT NULL, FULLTEXT INDEX \`IDX_9ef6db9d13df6882d36c8af0cc\` (\`title\`), FULLTEXT INDEX \`IDX_e51068c39974ca11fae5d44c88\` (\`body\`), FULLTEXT INDEX \`IDX_f43723dc196c18767a3893a3f7\` (\`summary\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`rbac_permission_roles_rbac_roles\` (\`rbacPermissionId\` varchar(36) NOT NULL, \`rbacRolesId\` varchar(36) NOT NULL, INDEX \`IDX_729cfb6b1737c0b504e33f986f\` (\`rbacPermissionId\`), INDEX \`IDX_6915858cb1d029e3fc8989644a\` (\`rbacRolesId\`), PRIMARY KEY (\`rbacPermissionId\`, \`rbacRolesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`rbac_permission_users_users\` (\`rbacPermissionId\` varchar(36) NOT NULL, \`usersId\` varchar(36) NOT NULL, INDEX \`IDX_261580b8cc66e2d093fd235d93\` (\`rbacPermissionId\`), INDEX \`IDX_a003c51e2bb1c2e47c9a7f959a\` (\`usersId\`), PRIMARY KEY (\`rbacPermissionId\`, \`usersId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`rbac_roles_users_users\` (\`rbacRolesId\` varchar(36) NOT NULL, \`usersId\` varchar(36) NOT NULL, INDEX \`IDX_3c933e8c0950496fa3a616e4b2\` (\`rbacRolesId\`), INDEX \`IDX_789b5818a876ba2c4f058bdeb9\` (\`usersId\`), PRIMARY KEY (\`rbacRolesId\`, \`usersId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_permissions_rbac_permission\` (\`usersId\` varchar(36) NOT NULL, \`rbacPermissionId\` varchar(36) NOT NULL, INDEX \`IDX_8bd8695b553c556f44972fda31\` (\`usersId\`), INDEX \`IDX_ef53340fc52f7f978606f49ef1\` (\`rbacPermissionId\`), PRIMARY KEY (\`usersId\`, \`rbacPermissionId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_roles_rbac_roles\` (\`usersId\` varchar(36) NOT NULL, \`rbacRolesId\` varchar(36) NOT NULL, INDEX \`IDX_3b6bb31ab207ca7c21088a009c\` (\`usersId\`), INDEX \`IDX_c97d36f8e1fd7c78d13b878718\` (\`rbacRolesId\`), PRIMARY KEY (\`usersId\`, \`rbacRolesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`content_posts_categories_content_categories\` (\`contentPostsId\` varchar(36) NOT NULL, \`contentCategoriesId\` varchar(36) NOT NULL, INDEX \`IDX_9172320639056856745c6bc21a\` (\`contentPostsId\`), INDEX \`IDX_82926fe45def38f6a53838347a\` (\`contentCategoriesId\`), PRIMARY KEY (\`contentPostsId\`, \`contentCategoriesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_refresh_tokens\` ADD CONSTRAINT \`FK_1dfd080c2abf42198691b60ae39\` FOREIGN KEY (\`accessTokenId\`) REFERENCES \`user_access_tokens\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_access_tokens\` ADD CONSTRAINT \`FK_71a030e491d5c8547fc1e38ef82\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`content_categories\` ADD CONSTRAINT \`FK_a03aea27707893300382b6f18ae\` FOREIGN KEY (\`parentId\`) REFERENCES \`content_categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`content_comments\` ADD CONSTRAINT \`FK_5e1c3747a0031f305e94493361f\` FOREIGN KEY (\`postId\`) REFERENCES \`content_posts\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`content_comments\` ADD CONSTRAINT \`FK_4a3469cba32f2dd9712821285e5\` FOREIGN KEY (\`authorId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`content_comments\` ADD CONSTRAINT \`FK_982a849f676860e5d6beb607f20\` FOREIGN KEY (\`parentId\`) REFERENCES \`content_comments\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`content_posts\` ADD CONSTRAINT \`FK_8fcc2d81ced7b8ade2bbd151b1a\` FOREIGN KEY (\`authorId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`rbac_permission_roles_rbac_roles\` ADD CONSTRAINT \`FK_729cfb6b1737c0b504e33f986fb\` FOREIGN KEY (\`rbacPermissionId\`) REFERENCES \`rbac_permission\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`rbac_permission_roles_rbac_roles\` ADD CONSTRAINT \`FK_6915858cb1d029e3fc8989644a1\` FOREIGN KEY (\`rbacRolesId\`) REFERENCES \`rbac_roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rbac_permission_users_users\` ADD CONSTRAINT \`FK_261580b8cc66e2d093fd235d931\` FOREIGN KEY (\`rbacPermissionId\`) REFERENCES \`rbac_permission\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`rbac_permission_users_users\` ADD CONSTRAINT \`FK_a003c51e2bb1c2e47c9a7f959af\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rbac_roles_users_users\` ADD CONSTRAINT \`FK_3c933e8c0950496fa3a616e4b27\` FOREIGN KEY (\`rbacRolesId\`) REFERENCES \`rbac_roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`rbac_roles_users_users\` ADD CONSTRAINT \`FK_789b5818a876ba2c4f058bdeb98\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_permissions_rbac_permission\` ADD CONSTRAINT \`FK_8bd8695b553c556f44972fda313\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_permissions_rbac_permission\` ADD CONSTRAINT \`FK_ef53340fc52f7f978606f49ef1e\` FOREIGN KEY (\`rbacPermissionId\`) REFERENCES \`rbac_permission\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_roles_rbac_roles\` ADD CONSTRAINT \`FK_3b6bb31ab207ca7c21088a009cd\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_roles_rbac_roles\` ADD CONSTRAINT \`FK_c97d36f8e1fd7c78d13b8787185\` FOREIGN KEY (\`rbacRolesId\`) REFERENCES \`rbac_roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`content_posts_categories_content_categories\` ADD CONSTRAINT \`FK_9172320639056856745c6bc21aa\` FOREIGN KEY (\`contentPostsId\`) REFERENCES \`content_posts\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`content_posts_categories_content_categories\` ADD CONSTRAINT \`FK_82926fe45def38f6a53838347a2\` FOREIGN KEY (\`contentCategoriesId\`) REFERENCES \`content_categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`content_posts_categories_content_categories\` DROP FOREIGN KEY \`FK_82926fe45def38f6a53838347a2\``);
        await queryRunner.query(`ALTER TABLE \`content_posts_categories_content_categories\` DROP FOREIGN KEY \`FK_9172320639056856745c6bc21aa\``);
        await queryRunner.query(`ALTER TABLE \`users_roles_rbac_roles\` DROP FOREIGN KEY \`FK_c97d36f8e1fd7c78d13b8787185\``);
        await queryRunner.query(`ALTER TABLE \`users_roles_rbac_roles\` DROP FOREIGN KEY \`FK_3b6bb31ab207ca7c21088a009cd\``);
        await queryRunner.query(`ALTER TABLE \`users_permissions_rbac_permission\` DROP FOREIGN KEY \`FK_ef53340fc52f7f978606f49ef1e\``);
        await queryRunner.query(`ALTER TABLE \`users_permissions_rbac_permission\` DROP FOREIGN KEY \`FK_8bd8695b553c556f44972fda313\``);
        await queryRunner.query(`ALTER TABLE \`rbac_roles_users_users\` DROP FOREIGN KEY \`FK_789b5818a876ba2c4f058bdeb98\``);
        await queryRunner.query(`ALTER TABLE \`rbac_roles_users_users\` DROP FOREIGN KEY \`FK_3c933e8c0950496fa3a616e4b27\``);
        await queryRunner.query(`ALTER TABLE \`rbac_permission_users_users\` DROP FOREIGN KEY \`FK_a003c51e2bb1c2e47c9a7f959af\``);
        await queryRunner.query(`ALTER TABLE \`rbac_permission_users_users\` DROP FOREIGN KEY \`FK_261580b8cc66e2d093fd235d931\``);
        await queryRunner.query(`ALTER TABLE \`rbac_permission_roles_rbac_roles\` DROP FOREIGN KEY \`FK_6915858cb1d029e3fc8989644a1\``);
        await queryRunner.query(`ALTER TABLE \`rbac_permission_roles_rbac_roles\` DROP FOREIGN KEY \`FK_729cfb6b1737c0b504e33f986fb\``);
        await queryRunner.query(`ALTER TABLE \`content_posts\` DROP FOREIGN KEY \`FK_8fcc2d81ced7b8ade2bbd151b1a\``);
        await queryRunner.query(`ALTER TABLE \`content_comments\` DROP FOREIGN KEY \`FK_982a849f676860e5d6beb607f20\``);
        await queryRunner.query(`ALTER TABLE \`content_comments\` DROP FOREIGN KEY \`FK_4a3469cba32f2dd9712821285e5\``);
        await queryRunner.query(`ALTER TABLE \`content_comments\` DROP FOREIGN KEY \`FK_5e1c3747a0031f305e94493361f\``);
        await queryRunner.query(`ALTER TABLE \`content_categories\` DROP FOREIGN KEY \`FK_a03aea27707893300382b6f18ae\``);
        await queryRunner.query(`ALTER TABLE \`user_access_tokens\` DROP FOREIGN KEY \`FK_71a030e491d5c8547fc1e38ef82\``);
        await queryRunner.query(`ALTER TABLE \`user_refresh_tokens\` DROP FOREIGN KEY \`FK_1dfd080c2abf42198691b60ae39\``);
        await queryRunner.query(`DROP INDEX \`IDX_82926fe45def38f6a53838347a\` ON \`content_posts_categories_content_categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_9172320639056856745c6bc21a\` ON \`content_posts_categories_content_categories\``);
        await queryRunner.query(`DROP TABLE \`content_posts_categories_content_categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_c97d36f8e1fd7c78d13b878718\` ON \`users_roles_rbac_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_3b6bb31ab207ca7c21088a009c\` ON \`users_roles_rbac_roles\``);
        await queryRunner.query(`DROP TABLE \`users_roles_rbac_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_ef53340fc52f7f978606f49ef1\` ON \`users_permissions_rbac_permission\``);
        await queryRunner.query(`DROP INDEX \`IDX_8bd8695b553c556f44972fda31\` ON \`users_permissions_rbac_permission\``);
        await queryRunner.query(`DROP TABLE \`users_permissions_rbac_permission\``);
        await queryRunner.query(`DROP INDEX \`IDX_789b5818a876ba2c4f058bdeb9\` ON \`rbac_roles_users_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_3c933e8c0950496fa3a616e4b2\` ON \`rbac_roles_users_users\``);
        await queryRunner.query(`DROP TABLE \`rbac_roles_users_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_a003c51e2bb1c2e47c9a7f959a\` ON \`rbac_permission_users_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_261580b8cc66e2d093fd235d93\` ON \`rbac_permission_users_users\``);
        await queryRunner.query(`DROP TABLE \`rbac_permission_users_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_6915858cb1d029e3fc8989644a\` ON \`rbac_permission_roles_rbac_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_729cfb6b1737c0b504e33f986f\` ON \`rbac_permission_roles_rbac_roles\``);
        await queryRunner.query(`DROP TABLE \`rbac_permission_roles_rbac_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_f43723dc196c18767a3893a3f7\` ON \`content_posts\``);
        await queryRunner.query(`DROP INDEX \`IDX_e51068c39974ca11fae5d44c88\` ON \`content_posts\``);
        await queryRunner.query(`DROP INDEX \`IDX_9ef6db9d13df6882d36c8af0cc\` ON \`content_posts\``);
        await queryRunner.query(`DROP TABLE \`content_posts\``);
        await queryRunner.query(`DROP TABLE \`content_comments\``);
        await queryRunner.query(`DROP INDEX \`IDX_d6aaf8517ca57297a8c3a44d3d\` ON \`content_categories\``);
        await queryRunner.query(`DROP TABLE \`content_categories\``);
        await queryRunner.query(`DROP TABLE \`user_code\``);
        await queryRunner.query(`DROP TABLE \`user_access_tokens\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_a000cca60bcf04454e72769949\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`rbac_roles\``);
        await queryRunner.query(`DROP TABLE \`rbac_permission\``);
        await queryRunner.query(`DROP INDEX \`REL_1dfd080c2abf42198691b60ae3\` ON \`user_refresh_tokens\``);
        await queryRunner.query(`DROP TABLE \`user_refresh_tokens\``);
    }

}
