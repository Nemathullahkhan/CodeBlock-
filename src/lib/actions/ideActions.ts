"use server";

// import { mergeSortData } from "../data/(divide_conquer)/mergesort";
// import { quickSortData } from "../data/(divide_conquer)/quicksort";
// import { floydsAlgorithmData } from "../data/(dynamic_programming)/floyd";
// import { knapSackData } from "../data/(dynamic_programming)/knapsack";
// import { dijkstraData } from "../data/(graph_algorithms)/dijkstra";

// import { warshallData } from "../data/(graph_algorithms)/warshall";
// import { topologicalSortData } from "../data/(graph_algorithms)/topological";
// import { bfsData } from "../data/(graph_algorithms)/bfs";
// import { dfsData } from "../data/(graph_algorithms)/dfs";
// import { kruskalData } from "../data/(greedy_techniques)/krushkal";
// import { primsData } from "../data/(greedy_techniques)/prims";
import { nQueensData } from "../data/(backtracking)/nqueen";
import prisma from "../prisma";

interface props {
  contentId: string;
}

export async function getSolution({ contentId }: props) {
  const contents = await prisma.content.findUnique({
    where: { id: contentId },
  });
  if (!contents) throw new Error("Failed to find the content");
}

// function ot add questions
export async function questions() {
  try {
    const program = await prisma.content.findUnique({
      where: { id: "cm7lgm7w7004jbu8ouk8n694l" },
    });

    if (!program) throw new Error("Id is incorrect");

    const questions = await prisma.questions.create({
      data: {
        question: nQueensData.questions.question,
        examples: nQueensData.questions.examples,
        constraints: nQueensData.questions.constraints,
        difficulty: nQueensData.questions.difficulty,
        testcases: nQueensData.questions.testcases,
        averageTime: nQueensData.questions.averageTime,
        contentId: "cm7lgm7w7004jbu8ouk8n694l",
      },
    });
    return questions;
  } catch (err: any) {
    console.error("Prisma Error:", err);
    throw new Error(`Server Error: ${err.message}`);
  }
}

export async function updateTestCases() {
  try {
    const updatedQuestion = await prisma.questions.update({
      where: { contentId: "cm7wx9udj0003bud004j1fycm" },
      data: {
        question: nQueensData.questions.question,
        examples: nQueensData.questions.examples,
        constraints: nQueensData.questions.constraints,
        difficulty: nQueensData.questions.difficulty,
        testcases: nQueensData.questions.testcases,
        averageTime: nQueensData.questions.averageTime,
      },
    });

    return updatedQuestion;
  } catch (err: any) {
    console.error("Prisma Error:", err);
    throw new Error(`Server Error: ${err.message}`);
  }
}


export async function getQuestions() {
  try {
    // const program = await prisma.content.findUnique({
    //   where:{id:"cm7j5g8wc0003bugszt63oddx"},
    // })
    // if(!program) throw new Error("Id is incorrect");

    const section = await prisma.questions.findUnique({
      where: { id: "cm7lal1lu000nbu8ostvrgszc" },
    });
    return section;
  } catch (err: any) {
    console.error("Prisma Error:", err);
    throw new Error(`Server Error: ${err.message}`);
  }
}

export async function questionCompleted({ id }: { id: string }) {
  try {
    const result = await prisma.content.update({
      where:{id},
      data:{ iscompleted: true}, 
      })
      console.log(result);
  } catch (err: any) {
    console.error("Prisma Error:", err);
    throw new Error(`Server Error: ${err.message}`);
  }
}


// export async function questionUserProgress({ id, userId, completed }: { id: string, userId: string, completed: boolean }) {
//   try {
//     // Find the Content record with the associated UserProgress
//     const content = await prisma.content.findUnique({
//       where: { id },
//       include: { UserProgress: true },
//     });

//     if (!content) {
//       throw new Error("Content not found");
//     }

//     // Find the specific UserProgress record for the given userId and contentId
//     const userProgress = content.UserProgress.find((up) => up.userId === userId);

//     if (!userProgress) {
//       throw new Error("UserProgress not found for the given user and content");
//     }

//     // Update the UserProgress record
//     const updatedUserProgress = await prisma.userProgress.update({
//       where: { id: userProgress.id },
//       data: { completed }, // Update the `completed` field
//     });

//     return updatedUserProgress;
//   } catch (err: any) {
//     console.error("Prisma Error:", err);
//     throw new Error(`Server Error: ${err.message}`);
//   }
// }

export async function questionUserProgress({ id, userId, completed }: { id: string, userId: string, completed: boolean }) {
  try {
    // First check if a UserProgress record already exists
    const existingProgress = await prisma.userProgress.findFirst({
      where: {
        contentId: id,
        userId: userId,
      },
    });

    if (existingProgress) {
      // Update existing record
      const updatedUserProgress = await prisma.userProgress.update({
        where: { id: existingProgress.id },
        data: { completed },
      });
      return updatedUserProgress;
    } else {
      // Create new record if it doesn't exist
      const newUserProgress = await prisma.userProgress.create({
        data: {
          contentId: id,
          userId: userId,
          completed,
        },
      });
      return newUserProgress;
    }
  } catch (err: any) {
    console.error("Prisma Error:", err);
    throw new Error(`Server Error: ${err.message}`);
  }
}

// Add this to your ideActions.js/ts file
export async function checkUserProgress({ id, userId }: { id: string, userId: string }) {
  try {
    const userProgress = await prisma.userProgress.findFirst({
      where: {
        contentId: id,
        userId: userId,
      },
    });
    
    return userProgress;
  } catch (err: any) {
    console.error("Prisma Error:", err);
    throw new Error(`Server Error: ${err.message}`);
  }
}