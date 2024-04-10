"use server";
import { v4 as uuidv4 } from "uuid";
import { sanityClient } from "./configSanity";

export async function getRandomKey() {
  return uuidv4();
}

export async function createTask(formData: any) {
  try {
    var date = new Date();
    await sanityClient.create({
      _type: "taskPost",
      title: formData.title,
      userEmail: formData.userEmail,
      TaskDate: date,
      TaskCompletedQ: false,
      content: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: formData.content,
              _key: getRandomKey(),
            },
          ],
          markDefs: [],
          _key: getRandomKey(),
        },
      ],
    });

    console.log("Task created");
  } catch (error) {
    console.error("Oh no, the update failed: ", error);
  }
}

export async function updateTask(_id: string, formData: any) {
  try {
    await sanityClient.patch(_id).set(formData).commit();
    console.log("Document updated successfully!");
  } catch (error) {
    console.error("Error updating document:", error);
  }
}

export async function deleteTask(_id: string) {
  console.log(_id);
  await sanityClient.delete(_id);
  console.log("Task deleted");
}

export async function getData(email: string, sortQuery?: string, dateQuery?: string) {
  const query = `*[ _type == "taskPost" && userEmail == "${email}" ${dateQuery || ""} ] ${sortQuery ||" | order(_createdAt asc)"}`;
  const data = await sanityClient.fetch(query);

  return data;
}
