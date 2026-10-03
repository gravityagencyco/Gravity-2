-- GRAVITY: شغّل هذا الملف كاملًا مرة واحدة في Supabase > SQL Editor

/* ---------- المدرسون ---------- */
create table profiles(
 id uuid primary key references auth.users on delete cascade,
 name text not null, phone text not null, gmail text, subject text, gov text, avatar text,
 role text not null default 'user' check (role in ('user','admin')),
 active boolean not null default true,
 created_at timestamptz default now());
alter table profiles enable row level security;

create function is_admin() returns boolean language sql security definer set search_path=public as
$$ select exists(select 1 from profiles where id=auth.uid() and role='admin') $$;

create policy p_sel on profiles for select using (auth.uid()=id or is_admin());
create policy p_ins on profiles for insert with check (auth.uid()=id and role='user' and active);
create policy p_upd on profiles for update using (auth.uid()=id or is_admin());
revoke update on profiles from anon, authenticated;
grant update(name,phone,gmail,subject,gov,avatar) on profiles to authenticated;

create view public_teachers as select id,name,subject,gov,avatar from profiles where active and role='user';
grant select on public_teachers to anon, authenticated;

/* ---------- المحتوى القابل للإدارة ---------- */
create table order_fields(
 id uuid primary key default gen_random_uuid(), key text, label text not null,
 type text not null default 'text' check (type in ('text','textarea','tel','number','url','color','select')),
 options text[] not null default '{}', only_svc text,
 required boolean not null default false, active boolean not null default true,
 sort int not null default 0, created_at timestamptz default now());
create table offers(
 id uuid primary key default gen_random_uuid(), name text not null, image text, description text,
 items text[] not null default '{}', price_old numeric, price_new numeric not null, discount_pct int,
 active boolean not null default true, sort int not null default 0, created_at timestamptz default now());
create table jobs(
 id uuid primary key default gen_random_uuid(), title text not null, description text, requirements text, apply_method text,
 active boolean not null default true, sort int not null default 0, created_at timestamptz default now());
create table partners(
 id uuid primary key default gen_random_uuid(), name text not null, image text, description text,
 active boolean not null default true, sort int not null default 0, created_at timestamptz default now());

do $$ declare t text; begin
 foreach t in array array['order_fields','offers','jobs','partners'] loop
  execute format('alter table %I enable row level security',t);
  execute format('create policy %I on %I for select using (active or is_admin())',t||'_r',t);
  execute format('create policy %I on %I for all using (is_admin()) with check (is_admin())',t||'_w',t);
 end loop; end $$;

insert into order_fields(key,label,type,required,only_svc,sort) values
 ('name','الاسم','text',true,null,1),
 ('series','اسم السلسلة','text',true,null,2),
 ('addr','العنوان','text',true,null,3),
 ('phone','رقم التليفون','tel',true,null,4),
 ('links','اللينكات (روابط الملفات أو الصور أو الصفحات)','textarea',true,'book',5),
 ('extra','جملة أو إضافات تحب تضيفها','textarea',false,null,6),
 ('color','اللون العام المفضل','color',false,null,7);

/* ---------- الطلبات ---------- */
create table orders(
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references profiles(id) on delete cascade,
 items jsonb not null, total numeric not null, answers jsonb not null default '[]',
 status text not null default 'pending' check (status in ('pending','processing','completed','cancelled')),
 notified_at timestamptz, created_at timestamptz default now());
alter table orders enable row level security;
create policy o_sel on orders for select using (user_id=auth.uid() or is_admin());
create policy o_ins on orders for insert with check (user_id=auth.uid() and status='pending' and notified_at is null
 and exists(select 1 from profiles where id=auth.uid() and active));
create policy o_upd on orders for update using (is_admin());
create policy o_del on orders for delete using (is_admin());

/* ---------- دوال الأدمن ---------- */
create function admin_set_active(uid uuid, flag boolean) returns void language plpgsql security definer set search_path=public as
$$ begin if not is_admin() then raise exception 'forbidden'; end if; update profiles set active=flag where id=uid and role<>'admin'; end $$;
create function admin_set_password(uid uuid, pw text) returns void language plpgsql security definer set search_path=public,extensions as
$$ begin if not is_admin() then raise exception 'forbidden'; end if; if length(pw)<6 then raise exception 'short'; end if;
 update auth.users set encrypted_password=crypt(pw,gen_salt('bf')) where id=uid; end $$;
create function admin_delete_user(uid uuid) returns void language plpgsql security definer set search_path=public as
$$ begin if not is_admin() then raise exception 'forbidden'; end if;
 delete from auth.users where id=uid and id in (select id from profiles where role<>'admin'); end $$;

/* ---------- صلاحيات الـ API (صريحة، حتى لو اختلفت الإعدادات الافتراضية) ---------- */
grant usage on schema public to anon, authenticated;
grant select on offers, jobs, partners, order_fields to anon, authenticated;
grant insert, update, delete on offers, jobs, partners, order_fields to authenticated;
grant select, insert on profiles to authenticated;
grant select, insert, update, delete on orders to authenticated;
grant execute on function is_admin(), admin_set_active(uuid,boolean), admin_set_password(uuid,text), admin_delete_user(uuid) to anon, authenticated;

-- بعد ما تسجّل حساب الأدمن من الموقع، نفّذ سطر واحد:
-- update profiles set role='admin' where phone='رقمك';
