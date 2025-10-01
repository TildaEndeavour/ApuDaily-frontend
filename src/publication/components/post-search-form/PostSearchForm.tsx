import SearchBar from "../../../shared/components/SearchBar.tsx";
import {
    Milestone, Tags, Tag as TagIcon, UserSearch, User as UserIcon, CircleDot, Map
} from "lucide-react";
import SearchFormSection from "./SearchFormSection.tsx";
import React, {useEffect} from "react";
import type { PostFilter } from "../../model/PostFilter.ts";
import { type Category, loader as loadAvailableCategories } from "../../model/Category.ts";
import { loadAllTagsFromServer, loadAllUserProfiles } from "../../services/requests.ts";
import type { Tag } from "../../model/Tag.ts";
import type { UserProfile } from "../../model/UserProfile.ts";

function useSearchFormData() {
    const [loading, setLoading] = React.useState(true);
    const [availableAuthors, setAvailableAuthors] = React.useState<UserProfile[]>([]);
    const [availableTags, setAvailableTags] = React.useState<Tag[]>([]);
    const [availableCategories, setAvailableCategories] = React.useState<Category[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [tags, categories, userProfiles] = await Promise.all([
                    loadAllTagsFromServer(),
                    loadAvailableCategories(),
                    loadAllUserProfiles(),
                ]);
                setAvailableTags(tags.body);
                setAvailableCategories(categories.body);
                setAvailableAuthors(userProfiles.body);
            } catch (error) {
                console.error("Error loading search form data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return { loading, availableAuthors, availableTags, availableCategories };
}

const PostSearchForm: React.FC<{
    filter: PostFilter,
    onUpdateFilter: React.Dispatch<React.SetStateAction<PostFilter>>,
    submitFilter: () => void
}> = ({ filter, onUpdateFilter, submitFilter }) => {

    const { loading, availableAuthors, availableTags, availableCategories } = useSearchFormData();

    const updateFilterArray = <T,>(
        key: keyof PostFilter,
        item: T,
        mode: "add" | "remove"
    ) => {
        onUpdateFilter(prev => {
            const current = prev[key] as T[];
            return {
                ...prev,
                [key]:
                    mode === "add"
                        ? [...current, item]
                        : current.filter((i: any) => i.id !== (item as any).id),
            };
        });
    };

    return loading ? (
        <div>Loading...</div>
    ) : (
        <div>
            <SearchBar />
            <br className="mt-6" />

            <SearchFormSection
                items={availableAuthors}
                itemIcon={<UserIcon size={24} strokeWidth={1} />}
                selectedItems={filter.users}
                onSelectItem={author => updateFilterArray("users", author, "add")}
                onRemoveItem={author => updateFilterArray("users", author, "remove")}
                name="Authors"
                defaultMessage="No authors specified"
                badge={<UserSearch size={32} strokeWidth={1} />}
            />

            <SearchFormSection
                items={availableTags}
                itemIcon={<TagIcon size={24} strokeWidth={1} />}
                selectedItems={filter.tags}
                onSelectItem={tag => updateFilterArray("tags", tag, "add")}
                onRemoveItem={tag => updateFilterArray("tags", tag, "remove")}
                name="Tags"
                defaultMessage="No tags specified"
                badge={<Tags size={32} strokeWidth={1} />}
            />

            <SearchFormSection
                items={availableCategories}
                itemIcon={<Map size={24} strokeWidth={1}/>}
                selectedItems={filter.category}
                onSelectItem={category => onUpdateFilter(prev => ({ ...prev, category: [category] }))}
                onRemoveItem={() => onUpdateFilter(prev => ({ ...prev, category: [] }))}
                name="Category"
                defaultMessage="Category isn't specified"
                badge={<Milestone size={32} strokeWidth={1} />}
            />

            <br className="mb-6" />
            <button
                className="w-full p-4 border-1 bg-gray-200 rounded-3xl"
                onClick={submitFilter}
            >
                Show results
            </button>
        </div>
    );
};

export default PostSearchForm;
