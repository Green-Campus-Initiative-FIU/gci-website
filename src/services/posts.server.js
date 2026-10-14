import { db } from "@/lib/firebase/admin";

// ** Create Post **
export async function createPost(postData) {
  const now = new Date();
  const docRef = await db.collection("posts").add({
    ...postData,
    published: Boolean(postData.published) || false,
    publishedAt: postData.published ? now : null,
    createdAt: now,
    updatedAt: now,
  });
  return {
    id: docRef.id,
    createdAt: now,
  };
}

// ** Read User Posts by UID **
export async function getUserPostsByUid(uid, limit = 20) {
  if (!db) return [];
  const snap = await db
    .collection("posts")
    .where("authorId", "==", uid)
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get();
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// ** Read Single Post by ID **
export async function getPostById(id) {
  if (!db) return null;
  const snap = await db.collection("posts").doc(id).get();
  if (!snap.exists) return null;
  return { id: snap.id, ...snap.data() };
}

// ** Read Single Published Post by ID **
export async function getPublishedPostById(id) {
  const post = await getPostById(id);
  if (!post) return null;
  return post.published === true ? post : null;
}

// ** Read ALL posts (sorted by createdAt)
export async function getAllPosts(limit = 20) {
  if (!db) return [];
  const snap = await db
    .collection("posts")
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get();
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// ** Read ALL published posts (sorted by createdAt)
export async function getAllPublishedPosts(limit = 20) {
  if (!db) return [];
  const snap = await db
    .collection("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get();
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// ** Query published post with pagination
export async function queryPublishedPosts({
  limit = 20,
  cursorDocId,
  category,
  tags,
} = {}) {
  if (!db) return { items: [], nextCursor: null };
  let query = db.collection("posts").where("published", "==", true);

  if (category) {
    query = query.where("category", "==", category);
  }

  if (Array.isArray(tags) && tags.length > 0) {
    query = query.where("tags", "array-contains-any", tags.slice(0, 10));
  }

  query = query.orderBy("createdAt", "desc").limit(limit);

  if (cursorDocId) {
    const cursorSnap = await db.collection("posts").doc(cursorDocId).get();
    if (cursorSnap.exists) {
      query = query.startAfter(cursorSnap);
    }
  }
  const snap = await query.get();
  const items = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  const nextCursor =
    snap.docs.length === limit ? snap.docs[snap.docs.length - 1].id : null;

  return { items, nextCursor };
}

// ** Update Post (with patch) **
export async function updatePostById(id, postData) {
  await db
    .collection("posts")
    .doc(id)
    .update({
      ...postData,
      updatedAt: new Date(),
    });
  return { success: true };
}

// ** Delete Post by ID **
export async function deletePostById(id) {
  await db.collection("posts").doc(id).delete();
  return { success: true };
}

// ** Toggle Publish Status by ID **
export async function togglePublishStatusById(id) {
  const ref = db.collection("posts").doc(id);
  const post = await ref.get();
  if (!post.exists) {
    return { error: "Post not found" };
  }
  const data = post.data();
  await ref.update({
    published: !data.published,
    publishedAt: !data.published ? new Date() : null,
    updatedAt: new Date(),
  });
  return { success: true, published: !data.published };
}
