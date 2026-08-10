import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $migration$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_pages_blocks_services_overview_items_icon') THEN
        CREATE TYPE "public"."enum_pages_blocks_services_overview_items_icon" AS ENUM('code', 'mobile', 'wechat', 'ai');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__pages_v_blocks_services_overview_items_icon') THEN
        CREATE TYPE "public"."enum__pages_v_blocks_services_overview_items_icon" AS ENUM('code', 'mobile', 'wechat', 'ai');
      END IF;
    END
    $migration$;

    CREATE TABLE IF NOT EXISTS "pages_blocks_enterprise_hero" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "description" varchar,
      "image_id" integer,
      "product_image_id" integer,
      "image_alt" varchar,
      "action_label" varchar,
      "action_href" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_strength" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "description" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_strength_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "value" varchar,
      "description" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_services_overview" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "description" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_services_overview_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "description" varchar,
      "icon" "enum_pages_blocks_services_overview_items_icon" DEFAULT 'code'
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_case_showcase" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "disclaimer" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_case_showcase_cases" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "summary" varchar,
      "image_id" integer,
      "image_alt" varchar,
      "keywords" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_development_process" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_development_process_steps" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "description" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_faq_section" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "enable_schema" boolean DEFAULT true,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "pages_blocks_faq_section_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "question" varchar,
      "answer" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_enterprise_hero" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar,
      "description" varchar,
      "image_id" integer,
      "product_image_id" integer,
      "image_alt" varchar,
      "action_label" varchar,
      "action_href" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_strength" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar,
      "description" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_strength_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "value" varchar,
      "description" varchar,
      "_uuid" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_services_overview" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar,
      "description" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_services_overview_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar,
      "description" varchar,
      "icon" "enum__pages_v_blocks_services_overview_items_icon" DEFAULT 'code',
      "_uuid" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_case_showcase" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar,
      "disclaimer" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_case_showcase_cases" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar,
      "summary" varchar,
      "image_id" integer,
      "image_alt" varchar,
      "keywords" varchar,
      "_uuid" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_development_process" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_development_process_steps" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar,
      "description" varchar,
      "_uuid" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_faq_section" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar,
      "enable_schema" boolean DEFAULT true,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_faq_section_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "question" varchar,
      "answer" varchar,
      "_uuid" varchar
    );

    ALTER TABLE "pages_blocks_contact_c_t_a" ADD COLUMN IF NOT EXISTS "title" varchar;
    ALTER TABLE "pages_blocks_contact_c_t_a" ADD COLUMN IF NOT EXISTS "action_label" varchar;
    ALTER TABLE "pages_blocks_contact_c_t_a" ADD COLUMN IF NOT EXISTS "action_href" varchar;
    ALTER TABLE "_pages_v_blocks_contact_c_t_a" ADD COLUMN IF NOT EXISTS "title" varchar;
    ALTER TABLE "_pages_v_blocks_contact_c_t_a" ADD COLUMN IF NOT EXISTS "action_label" varchar;
    ALTER TABLE "_pages_v_blocks_contact_c_t_a" ADD COLUMN IF NOT EXISTS "action_href" varchar;

    DO $contact$
    BEGIN
      IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'pages_blocks_contact_c_t_a' AND column_name = 'heading') THEN
        EXECUTE 'UPDATE "pages_blocks_contact_c_t_a" SET "title" = COALESCE("title", "heading")';
      END IF;
      IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'pages_blocks_contact_c_t_a' AND column_name = 'button_label') THEN
        EXECUTE 'UPDATE "pages_blocks_contact_c_t_a" SET "action_label" = COALESCE("action_label", "button_label")';
      END IF;
      IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'pages_blocks_contact_c_t_a' AND column_name = 'button_url') THEN
        EXECUTE 'UPDATE "pages_blocks_contact_c_t_a" SET "action_href" = COALESCE("action_href", "button_url")';
      END IF;
      IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = '_pages_v_blocks_contact_c_t_a' AND column_name = 'heading') THEN
        EXECUTE 'UPDATE "_pages_v_blocks_contact_c_t_a" SET "title" = COALESCE("title", "heading")';
      END IF;
      IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = '_pages_v_blocks_contact_c_t_a' AND column_name = 'button_label') THEN
        EXECUTE 'UPDATE "_pages_v_blocks_contact_c_t_a" SET "action_label" = COALESCE("action_label", "button_label")';
      END IF;
      IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = '_pages_v_blocks_contact_c_t_a' AND column_name = 'button_url') THEN
        EXECUTE 'UPDATE "_pages_v_blocks_contact_c_t_a" SET "action_href" = COALESCE("action_href", "button_url")';
      END IF;
    END
    $contact$;

    DO $migration$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_blocks_enterprise_hero_image_id_media_id_fk') THEN
        ALTER TABLE "pages_blocks_enterprise_hero" ADD CONSTRAINT "pages_blocks_enterprise_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_blocks_enterprise_hero_product_image_id_media_id_fk') THEN
        ALTER TABLE "pages_blocks_enterprise_hero" ADD CONSTRAINT "pages_blocks_enterprise_hero_product_image_id_media_id_fk" FOREIGN KEY ("product_image_id") REFERENCES "public"."media"("id") ON DELETE set null;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_blocks_enterprise_hero_parent_id_fk') THEN
        ALTER TABLE "pages_blocks_enterprise_hero" ADD CONSTRAINT "pages_blocks_enterprise_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_blocks_strength_parent_id_fk') THEN
        ALTER TABLE "pages_blocks_strength" ADD CONSTRAINT "pages_blocks_strength_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_blocks_strength_items_parent_id_fk') THEN
        ALTER TABLE "pages_blocks_strength_items" ADD CONSTRAINT "pages_blocks_strength_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_strength"("id") ON DELETE cascade;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_blocks_services_overview_parent_id_fk') THEN
        ALTER TABLE "pages_blocks_services_overview" ADD CONSTRAINT "pages_blocks_services_overview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_blocks_services_overview_items_parent_id_fk') THEN
        ALTER TABLE "pages_blocks_services_overview_items" ADD CONSTRAINT "pages_blocks_services_overview_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_overview"("id") ON DELETE cascade;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_blocks_case_showcase_parent_id_fk') THEN
        ALTER TABLE "pages_blocks_case_showcase" ADD CONSTRAINT "pages_blocks_case_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_blocks_case_showcase_cases_parent_id_fk') THEN
        ALTER TABLE "pages_blocks_case_showcase_cases" ADD CONSTRAINT "pages_blocks_case_showcase_cases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_case_showcase"("id") ON DELETE cascade;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_blocks_case_showcase_cases_image_id_media_id_fk') THEN
        ALTER TABLE "pages_blocks_case_showcase_cases" ADD CONSTRAINT "pages_blocks_case_showcase_cases_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_blocks_development_process_parent_id_fk') THEN
        ALTER TABLE "pages_blocks_development_process" ADD CONSTRAINT "pages_blocks_development_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_blocks_development_process_steps_parent_id_fk') THEN
        ALTER TABLE "pages_blocks_development_process_steps" ADD CONSTRAINT "pages_blocks_development_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_development_process"("id") ON DELETE cascade;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_blocks_faq_section_parent_id_fk') THEN
        ALTER TABLE "pages_blocks_faq_section" ADD CONSTRAINT "pages_blocks_faq_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_blocks_faq_section_items_parent_id_fk') THEN
        ALTER TABLE "pages_blocks_faq_section_items" ADD CONSTRAINT "pages_blocks_faq_section_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_section"("id") ON DELETE cascade;
      END IF;

      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_blocks_enterprise_hero_image_id_media_id_fk') THEN
        ALTER TABLE "_pages_v_blocks_enterprise_hero" ADD CONSTRAINT "_pages_v_blocks_enterprise_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_blocks_enterprise_hero_product_image_id_media_id_fk') THEN
        ALTER TABLE "_pages_v_blocks_enterprise_hero" ADD CONSTRAINT "_pages_v_blocks_enterprise_hero_product_image_id_media_id_fk" FOREIGN KEY ("product_image_id") REFERENCES "public"."media"("id") ON DELETE set null;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_blocks_enterprise_hero_parent_id_fk') THEN
        ALTER TABLE "_pages_v_blocks_enterprise_hero" ADD CONSTRAINT "_pages_v_blocks_enterprise_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_blocks_strength_parent_id_fk') THEN
        ALTER TABLE "_pages_v_blocks_strength" ADD CONSTRAINT "_pages_v_blocks_strength_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_blocks_strength_items_parent_id_fk') THEN
        ALTER TABLE "_pages_v_blocks_strength_items" ADD CONSTRAINT "_pages_v_blocks_strength_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_strength"("id") ON DELETE cascade;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_blocks_services_overview_parent_id_fk') THEN
        ALTER TABLE "_pages_v_blocks_services_overview" ADD CONSTRAINT "_pages_v_blocks_services_overview_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_blocks_services_overview_items_parent_id_fk') THEN
        ALTER TABLE "_pages_v_blocks_services_overview_items" ADD CONSTRAINT "_pages_v_blocks_services_overview_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services_overview"("id") ON DELETE cascade;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_blocks_case_showcase_parent_id_fk') THEN
        ALTER TABLE "_pages_v_blocks_case_showcase" ADD CONSTRAINT "_pages_v_blocks_case_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_blocks_case_showcase_cases_parent_id_fk') THEN
        ALTER TABLE "_pages_v_blocks_case_showcase_cases" ADD CONSTRAINT "_pages_v_blocks_case_showcase_cases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_case_showcase"("id") ON DELETE cascade;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_blocks_case_showcase_cases_image_id_media_id_fk') THEN
        ALTER TABLE "_pages_v_blocks_case_showcase_cases" ADD CONSTRAINT "_pages_v_blocks_case_showcase_cases_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_blocks_development_process_parent_id_fk') THEN
        ALTER TABLE "_pages_v_blocks_development_process" ADD CONSTRAINT "_pages_v_blocks_development_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_blocks_development_process_steps_parent_id_fk') THEN
        ALTER TABLE "_pages_v_blocks_development_process_steps" ADD CONSTRAINT "_pages_v_blocks_development_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_development_process"("id") ON DELETE cascade;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_blocks_faq_section_parent_id_fk') THEN
        ALTER TABLE "_pages_v_blocks_faq_section" ADD CONSTRAINT "_pages_v_blocks_faq_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_pages_v_blocks_faq_section_items_parent_id_fk') THEN
        ALTER TABLE "_pages_v_blocks_faq_section_items" ADD CONSTRAINT "_pages_v_blocks_faq_section_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_section"("id") ON DELETE cascade;
      END IF;
    END
    $migration$;

    CREATE INDEX IF NOT EXISTS "pages_blocks_enterprise_hero_order_idx" ON "pages_blocks_enterprise_hero" ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_enterprise_hero_parent_id_idx" ON "pages_blocks_enterprise_hero" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_enterprise_hero_path_idx" ON "pages_blocks_enterprise_hero" ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_enterprise_hero_image_idx" ON "pages_blocks_enterprise_hero" ("image_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_enterprise_hero_product_image_idx" ON "pages_blocks_enterprise_hero" ("product_image_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_strength_order_idx" ON "pages_blocks_strength" ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_strength_parent_id_idx" ON "pages_blocks_strength" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_strength_path_idx" ON "pages_blocks_strength" ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_strength_items_order_idx" ON "pages_blocks_strength_items" ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_strength_items_parent_id_idx" ON "pages_blocks_strength_items" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_services_overview_order_idx" ON "pages_blocks_services_overview" ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_services_overview_parent_id_idx" ON "pages_blocks_services_overview" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_services_overview_path_idx" ON "pages_blocks_services_overview" ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_services_overview_items_order_idx" ON "pages_blocks_services_overview_items" ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_services_overview_items_parent_id_idx" ON "pages_blocks_services_overview_items" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_case_showcase_order_idx" ON "pages_blocks_case_showcase" ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_case_showcase_parent_id_idx" ON "pages_blocks_case_showcase" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_case_showcase_path_idx" ON "pages_blocks_case_showcase" ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_case_showcase_cases_order_idx" ON "pages_blocks_case_showcase_cases" ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_case_showcase_cases_parent_id_idx" ON "pages_blocks_case_showcase_cases" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_case_showcase_cases_image_idx" ON "pages_blocks_case_showcase_cases" ("image_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_development_process_order_idx" ON "pages_blocks_development_process" ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_development_process_parent_id_idx" ON "pages_blocks_development_process" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_development_process_path_idx" ON "pages_blocks_development_process" ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_development_process_steps_order_idx" ON "pages_blocks_development_process_steps" ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_development_process_steps_parent_id_idx" ON "pages_blocks_development_process_steps" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_faq_section_order_idx" ON "pages_blocks_faq_section" ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_faq_section_parent_id_idx" ON "pages_blocks_faq_section" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_faq_section_path_idx" ON "pages_blocks_faq_section" ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_faq_section_items_order_idx" ON "pages_blocks_faq_section_items" ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_faq_section_items_parent_id_idx" ON "pages_blocks_faq_section_items" ("_parent_id");

    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_enterprise_hero_order_idx" ON "_pages_v_blocks_enterprise_hero" ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_enterprise_hero_parent_id_idx" ON "_pages_v_blocks_enterprise_hero" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_enterprise_hero_path_idx" ON "_pages_v_blocks_enterprise_hero" ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_enterprise_hero_image_idx" ON "_pages_v_blocks_enterprise_hero" ("image_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_enterprise_hero_product_image_idx" ON "_pages_v_blocks_enterprise_hero" ("product_image_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strength_order_idx" ON "_pages_v_blocks_strength" ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strength_parent_id_idx" ON "_pages_v_blocks_strength" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strength_path_idx" ON "_pages_v_blocks_strength" ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strength_items_order_idx" ON "_pages_v_blocks_strength_items" ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_strength_items_parent_id_idx" ON "_pages_v_blocks_strength_items" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_overview_order_idx" ON "_pages_v_blocks_services_overview" ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_overview_parent_id_idx" ON "_pages_v_blocks_services_overview" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_overview_path_idx" ON "_pages_v_blocks_services_overview" ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_overview_items_order_idx" ON "_pages_v_blocks_services_overview_items" ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_overview_items_parent_id_idx" ON "_pages_v_blocks_services_overview_items" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_case_showcase_order_idx" ON "_pages_v_blocks_case_showcase" ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_case_showcase_parent_id_idx" ON "_pages_v_blocks_case_showcase" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_case_showcase_path_idx" ON "_pages_v_blocks_case_showcase" ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_case_showcase_cases_order_idx" ON "_pages_v_blocks_case_showcase_cases" ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_case_showcase_cases_parent_id_idx" ON "_pages_v_blocks_case_showcase_cases" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_case_showcase_cases_image_idx" ON "_pages_v_blocks_case_showcase_cases" ("image_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_development_process_order_idx" ON "_pages_v_blocks_development_process" ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_development_process_parent_id_idx" ON "_pages_v_blocks_development_process" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_development_process_path_idx" ON "_pages_v_blocks_development_process" ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_development_process_steps_order_idx" ON "_pages_v_blocks_development_process_steps" ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_development_process_steps_parent_id_idx" ON "_pages_v_blocks_development_process_steps" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_section_order_idx" ON "_pages_v_blocks_faq_section" ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_section_parent_id_idx" ON "_pages_v_blocks_faq_section" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_section_path_idx" ON "_pages_v_blocks_faq_section" ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_section_items_order_idx" ON "_pages_v_blocks_faq_section_items" ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_faq_section_items_parent_id_idx" ON "_pages_v_blocks_faq_section_items" ("_parent_id");
  `)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // This repair migration deliberately has no destructive rollback. The tables may
  // already have been created by the full baseline migration on a fresh database.
}
