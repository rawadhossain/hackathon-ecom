'use client';

const DisplayInterest = (aiPrice) => {
	return (
		<div className="flex flex-wrap gap-3 mt-2">
			<div className="group relative flex items-center text-sm font-medium text-foreground border border-border shadow-sm bg-muted py-1 px-4 rounded-full transition-all duration-300">
				{/* Push the skill text right when icon appears */}
				<span className="transition-all duration-300 pl-1 group-hover:pl-2">{aiPrice}</span>
			</div>
		</div>
	);
};

export default DisplayInterest;
