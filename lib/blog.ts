import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "content/blog")

export type Post = {
  slug: string
  title: string
  date: string
  excerpt: string
  coverImage?: string
  content: string
}

// Helper function to ensure the content directory exists
function ensureDirectoryExists() {
  try {
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true })
    }
  } catch (error) {
    console.error("Error creating blog directory:", error)
  }
}

export async function getAllPosts(locale: string): Promise<Post[]> {
  ensureDirectoryExists()

  // Get the locale-specific directory
  const localeDirectory = path.join(postsDirectory, locale)

  // If the directory doesn't exist, return mock data
  if (!fs.existsSync(localeDirectory)) {
    return getMockPosts(locale)
  }

  const fileNames = fs.readdirSync(localeDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
    .map((fileName) => {
      // Remove ".md" or ".mdx" from file name to get slug
      const slug = fileName.replace(/\.mdx?$/, "")

      // Read markdown file as string
      const fullPath = path.join(localeDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents)

      // Combine the data with the slug
      return {
        slug,
        title: matterResult.data.title || "",
        date: matterResult.data.date || "",
        excerpt: matterResult.data.excerpt || "",
        coverImage: matterResult.data.coverImage || "",
        content: matterResult.content,
      }
    })

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getPostBySlug(slug: string, locale: string): Promise<Post | null> {
  ensureDirectoryExists()

  // Get the locale-specific directory
  const localeDirectory = path.join(postsDirectory, locale)

  // If the directory doesn't exist, return mock data
  if (!fs.existsSync(localeDirectory)) {
    const mockPosts = getMockPosts(locale)
    const post = mockPosts.find((p) => p.slug === slug)

    if (!post) {
      return null
    }

    // Generate mock content
    post.content = generateMockContent(post, locale)
    return post
  }

  try {
    // Check for both .md and .mdx extensions
    let fullPath = path.join(localeDirectory, `${slug}.md`)
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(localeDirectory, `${slug}.mdx`)
      if (!fs.existsSync(fullPath)) {
        return null
      }
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const matterResult = matter(fileContents)

    return {
      slug,
      title: matterResult.data.title || "",
      date: matterResult.data.date || "",
      excerpt: matterResult.data.excerpt || "",
      coverImage: matterResult.data.coverImage || "",
      content: matterResult.content,
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

// Helper function to generate mock posts when real posts don't exist
function getMockPosts(locale: string): Post[] {
  const mockPosts: Post[] = [
    {
      slug: "fire-safety-tips-for-businesses",
      title:
        locale === "en"
          ? "Essential Fire Safety Tips for Businesses"
          : "Conseils Essentiels de Sécurité Incendie pour les Entreprises",
      date: "2023-05-15",
      excerpt:
        locale === "en"
          ? "Learn the most important fire safety measures every business should implement to protect employees and property."
          : "Découvrez les mesures de sécurité incendie les plus importantes que chaque entreprise devrait mettre en œuvre pour protéger les employés et les biens.",
      coverImage: "/placeholder.svg?height=300&width=600",
      content: "",
    },
    {
      slug: "understanding-fire-alarm-systems",
      title:
        locale === "en"
          ? "Understanding Modern Fire Alarm Systems"
          : "Comprendre les Systèmes d'Alarme Incendie Modernes",
      date: "2023-06-22",
      excerpt:
        locale === "en"
          ? "A comprehensive guide to the different types of fire alarm systems available today and how to choose the right one for your needs."
          : "Un guide complet des différents types de systèmes d'alarme incendie disponibles aujourd'hui et comment choisir celui qui convient à vos besoins.",
      coverImage: "/placeholder.svg?height=300&width=600",
      content: "",
    },
    {
      slug: "fire-safety-regulations-update",
      title:
        locale === "en"
          ? "2023 Fire Safety Regulations Update"
          : "Mise à Jour des Réglementations de Sécurité Incendie 2023",
      date: "2023-07-10",
      excerpt:
        locale === "en"
          ? "Stay compliant with the latest changes to fire safety regulations and standards that affect commercial buildings."
          : "Restez conforme aux derniers changements des réglementations et normes de sécurité incendie qui affectent les bâtiments commerciaux.",
      coverImage: "/placeholder.svg?height=300&width=600",
      content: "",
    },
    {
      slug: "sprinkler-systems-explained",
      title:
        locale === "en"
          ? "Sprinkler Systems Explained: Types and Benefits"
          : "Systèmes de Sprinkleurs Expliqués: Types et Avantages",
      date: "2023-08-05",
      excerpt:
        locale === "en"
          ? "Discover the different types of sprinkler systems, how they work, and why they are essential for comprehensive fire protection."
          : "Découvrez les différents types de systèmes de sprinkleurs, comment ils fonctionnent et pourquoi ils sont essentiels pour une protection incendie complète.",
      coverImage: "/placeholder.svg?height=300&width=600",
      content: "",
    },
    {
      slug: "fire-safety-training-importance",
      title:
        locale === "en"
          ? "The Importance of Regular Fire Safety Training"
          : "L'Importance d'une Formation Régulière à la Sécurité Incendie",
      date: "2023-09-18",
      excerpt:
        locale === "en"
          ? "Why ongoing fire safety training is crucial for all employees and how to implement an effective training program."
          : "Pourquoi la formation continue à la sécurité incendie est cruciale pour tous les employés et comment mettre en œuvre un programme de formation efficace.",
      coverImage: "/placeholder.svg?height=300&width=600",
      content: "",
    },
  ]

  return mockPosts
}

// Helper function to generate mock content for a post
function generateMockContent(post: Post, locale: string): string {
  if (locale === "en") {
    return `
# ${post.title}

${post.excerpt}

## Introduction

Fire safety is a critical aspect of building management and operations. Whether you're a business owner, facility manager, or safety officer, understanding the fundamentals of fire safety is essential for protecting lives and property.

## Key Points

- Regular inspection and maintenance of fire safety equipment
- Clear evacuation routes and emergency procedures
- Staff training and awareness programs
- Compliance with local fire safety regulations
- Documentation and record-keeping

## Best Practices

1. **Conduct Regular Risk Assessments**: Identify potential fire hazards and take steps to mitigate them.
2. **Install Appropriate Fire Detection Systems**: Ensure early detection with smoke detectors, heat sensors, and alarm systems.
3. **Maintain Fire Suppression Equipment**: Regularly inspect and service fire extinguishers, sprinkler systems, and other suppression equipment.
4. **Establish Clear Evacuation Procedures**: Develop and communicate evacuation plans, including designated assembly points.
5. **Provide Staff Training**: Ensure all employees know how to respond in case of a fire emergency.

## Conclusion

Implementing comprehensive fire safety measures is not just about compliance—it's about creating a safer environment for everyone in your building. By staying informed about best practices and regulations, you can significantly reduce the risk of fire incidents and ensure better outcomes if an emergency does occur.
`
  } else {
    return `
# ${post.title}

${post.excerpt}

## Introduction

La sécurité incendie est un aspect critique de la gestion et des opérations des bâtiments. Que vous soyez propriétaire d'entreprise, gestionnaire d'installations ou responsable de la sécurité, comprendre les principes fondamentaux de la sécurité incendie est essentiel pour protéger les vies et les biens.

## Points Clés

- Inspection et maintenance régulières des équipements de sécurité incendie
- Voies d'évacuation et procédures d'urgence claires
- Programmes de formation et de sensibilisation du personnel
- Conformité aux réglementations locales de sécurité incendie
- Documentation et tenue de registres

## Meilleures Pratiques

1. **Effectuer des Évaluations de Risques Régulières**: Identifier les dangers potentiels d'incendie et prendre des mesures pour les atténuer.
2. **Installer des Systèmes de Détection d'Incendie Appropriés**: Assurer une détection précoce avec des détecteurs de fumée, des capteurs de chaleur et des systèmes d'alarme.
3. **Entretenir l'Équipement de Suppression d'Incendie**: Inspecter et entretenir régulièrement les extincteurs, les systèmes de sprinkleurs et autres équipements de suppression.
4. **Établir des Procédures d'Évacuation Claires**: Développer et communiquer des plans d'évacuation, y compris des points de rassemblement désignés.
5. **Fournir une Formation au Personnel**: S'assurer que tous les employés savent comment réagir en cas d'urgence incendie.

## Conclusion

Mettre en œuvre des mesures complètes de sécurité incendie ne concerne pas seulement la conformité—il s'agit de créer un environnement plus sûr pour tous dans votre bâtiment. En restant informé des meilleures pratiques et des réglementations, vous pouvez réduire considérablement le risque d'incidents d'incendie et assurer de meilleurs résultats si une urgence survient.
`
  }
}

