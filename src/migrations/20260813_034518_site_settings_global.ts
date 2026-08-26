import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_meta_search_enhancement_schema_type" AS ENUM('WebPage', 'Service', 'AboutPage', 'ContactPage', 'CollectionPage');
  CREATE TYPE "public"."enum__pages_v_version_meta_search_enhancement_schema_type" AS ENUM('WebPage', 'Service', 'AboutPage', 'ContactPage', 'CollectionPage');
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT '无锡寻光数字科技' NOT NULL,
  	"brand_description" varchar DEFAULT '专注软件定制、网站、APP、小程序与 AI 应用开发的技术服务品牌。' NOT NULL,
  	"contact_email" varchar DEFAULT 'service@gleamseek.com' NOT NULL,
  	"contact_wechat" varchar DEFAULT 'Chris_Leo_' NOT NULL,
  	"contact_wechat_q_r_code_id" integer,
  	"contact_service_area" varchar DEFAULT '面向全国企业客户提供远程与现场协作' NOT NULL,
  	"default_s_e_o_title" varchar DEFAULT '无锡寻光数字科技｜软件定制、网站开发、APP开发、小程序开发、AI应用开发、Web3开发、项目二次开发' NOT NULL,
  	"default_s_e_o_description" varchar DEFAULT '无锡寻光数字科技提供软件定制开发、网站开发、APP开发、小程序开发、AI应用开发、Web3区块链智能合约开发、项目二次开发，覆盖能源管理、IOT物联网、AI数字人、娱乐交友、生活服务、企业管理、电商/金融、医疗、区块链等多个场景。' NOT NULL,
  	"default_s_e_o_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  INSERT INTO "site_settings" ("contact_email", "contact_wechat_q_r_code_id")
  SELECT COALESCE("contact_email", 'service@gleamseek.com'), "wechat_q_r_code_id"
  FROM "footer"
  LIMIT 1;
  
  ALTER TABLE "footer" DROP CONSTRAINT "footer_wechat_q_r_code_id_media_id_fk";
  
  DROP INDEX "footer_wechat_q_r_code_idx";
  ALTER TABLE "pages" ADD COLUMN "meta_search_enhancement_canonical_u_r_l" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_search_enhancement_schema_type" "enum_pages_meta_search_enhancement_schema_type" DEFAULT 'WebPage';
  ALTER TABLE "pages" ADD COLUMN "meta_search_enhancement_entity_summary" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_search_enhancement_no_index" boolean DEFAULT false;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_search_enhancement_canonical_u_r_l" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_search_enhancement_schema_type" "enum__pages_v_version_meta_search_enhancement_schema_type" DEFAULT 'WebPage';
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_search_enhancement_entity_summary" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_search_enhancement_no_index" boolean DEFAULT false;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_contact_wechat_q_r_code_id_media_id_fk" FOREIGN KEY ("contact_wechat_q_r_code_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_s_e_o_image_id_media_id_fk" FOREIGN KEY ("default_s_e_o_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "site_settings_contact_contact_wechat_q_r_code_idx" ON "site_settings" USING btree ("contact_wechat_q_r_code_id");
  CREATE INDEX "site_settings_default_s_e_o_default_s_e_o_image_idx" ON "site_settings" USING btree ("default_s_e_o_image_id");
  ALTER TABLE "footer" DROP COLUMN "contact_email";
  ALTER TABLE "footer" DROP COLUMN "wechat_q_r_code_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "site_settings" CASCADE;
  ALTER TABLE "footer" ADD COLUMN "contact_email" varchar DEFAULT 'service@gleamseek.com' NOT NULL;
  ALTER TABLE "footer" ADD COLUMN "wechat_q_r_code_id" integer;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_wechat_q_r_code_id_media_id_fk" FOREIGN KEY ("wechat_q_r_code_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "footer_wechat_q_r_code_idx" ON "footer" USING btree ("wechat_q_r_code_id");
  ALTER TABLE "pages" DROP COLUMN "meta_search_enhancement_canonical_u_r_l";
  ALTER TABLE "pages" DROP COLUMN "meta_search_enhancement_schema_type";
  ALTER TABLE "pages" DROP COLUMN "meta_search_enhancement_entity_summary";
  ALTER TABLE "pages" DROP COLUMN "meta_search_enhancement_no_index";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_search_enhancement_canonical_u_r_l";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_search_enhancement_schema_type";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_search_enhancement_entity_summary";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_search_enhancement_no_index";
  DROP TYPE "public"."enum_pages_meta_search_enhancement_schema_type";
  DROP TYPE "public"."enum__pages_v_version_meta_search_enhancement_schema_type";`)
}
